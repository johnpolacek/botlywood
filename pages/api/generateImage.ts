import type { NextApiRequest, NextApiResponse } from 'next'
import { generateImage } from "../../lib/openai/OpenAI"

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI")
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { prompt, n } = req.body

  if (!prompt) {
    return new Response("No prompt or messages in the request", { status: 400 })
  }

  const result = await generateImage({ prompt, size: "512x512", n })
  const images = result.data.map((data: { url: string }) => {
    return data.url
  })
  res.status(200).json({ images });
}

export default handler
