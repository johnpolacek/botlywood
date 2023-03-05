import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from "eventsource-parser"

export type Message = {
  role: string
  content: string
}

export interface ChatGPTStreamPayload {
  model: string
  messages: Message[]
  temperature: number
  top_p: number
  frequency_penalty: number
  presence_penalty: number
  max_tokens: number
  stream: boolean
  n: number
}

export async function OpenChatGPTStream(payload: ChatGPTStreamPayload) {
  const encoder = new TextEncoder()
  const decoder = new TextDecoder()

  console.log("OpenChatGPTStream")

  let isStreaming = false

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
    },
    method: "POST",
    body: JSON.stringify(payload),
  })

  console.log("got response", res.body)

  const stream = new ReadableStream({
    async start(controller) {
      function onParse(event: ParsedEvent | ReconnectInterval) {
        if (event.type === "event") {
          const data = event.data
          if (data === "[DONE]") {
            controller.close()
            return
          }
          try {
            const json = JSON.parse(data)
            const text = json.choices[0].delta.content
            if (!text) {
              return
            }
            if (
              !isStreaming &&
              text.replace(/\n/g, "").replace(/\s/g, "") === ""
            ) {
              // this is a prefix character (i.e., "\n\n"), do nothing
              return
            }
            const queue = encoder.encode(text)
            controller.enqueue(queue)
            if (!isStreaming) {
              console.log("streaming...")
            }
            isStreaming = true
          } catch (e) {
            // maybe parse error
            controller.error(e)
            console.log("controller error", e)
          }
        } else {
          console.log("bad event", { event })
        }
      }

      // stream response (SSE) from OpenAI may be fragmented into multiple chunks
      // this ensures we properly read chunks and invoke an event for each SSE event stream
      const parser = createParser(onParse)
      // https://web.dev/streams/#asynchronous-iteration
      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk))
      }
    },
  })

  return stream
}
