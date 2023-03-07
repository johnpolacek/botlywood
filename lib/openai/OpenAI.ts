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

  let isStreaming = false

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
    },
    method: "POST",
    body: JSON.stringify(payload),
  })

  const stream = new ReadableStream({
    async start(controller) {
      const onParse = (event: ParsedEvent | ReconnectInterval) => {
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

      setTimeout(() => {
        console.log("1s response timeout check... isStreaming: " + isStreaming)
        if (!isStreaming) {
          controller.error(new Error("Response timeout"))
        }
      }, 1000)

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

interface Params {
  prompt: string;
  n?: number;
  size?: string;
  response_format?: string;
  user?: string;
}

export async function generateImage({ prompt, n }: Params) {
  const apiKey = process.env.OPENAI_API_KEY;
  const params = {
    prompt,
    n,
  };
  const headers = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };
  const req = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(params),
  }

  try {
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      req,
    );

    const result = await response.json();

    if (response.ok) {
      return result;
    } else {
      throw new Error(result.error || "Failed to generate image");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to generate image");
  }
}

