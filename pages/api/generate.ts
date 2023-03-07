import {
  OpenChatGPTStream,
  ChatGPTStreamPayload,
  Message,
} from "../../lib/openai/OpenAI"

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI")
}

export const config = {
  runtime: "edge",
}

const handler = async (req: Request): Promise<Response> => {
  const { prompt, messages } = (await req.json()) as {
    prompt?: string
    messages?: Message[]
  }

  if (!prompt && !messages) {
    return new Response("No prompt or messages in the request", { status: 400 })
  }

  const payload: ChatGPTStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: messages || [{ role: "user", content: prompt } as Message],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 2048,
    stream: true,
    n: 1,
  }

  const stream = await OpenChatGPTStream(payload)
  return new Response(stream)
}

export default handler
