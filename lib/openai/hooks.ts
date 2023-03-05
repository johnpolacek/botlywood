// use this hook to fetch data from a stream
// get the cumulative response as it is read
export interface Message {
  role: "system" | "user" | "assistant"
  content: string
}

export const useStreamingDataFromPrompt = async ({
  prompt,
  messages,
  onData,
  onDone,
}: {
  onData: (data: string) => void
  prompt?: string
  messages?: Message[]
  onDone?: () => void
}) => {
  if (!prompt && !messages) {
    throw new Error("Must provide a prompt or messages")
  }

  let payload = { messages: messages || [{ role: "user", content: prompt }] }

  const response = await fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...payload,
    }),
  })
  if (!response.ok) {
    throw new Error(response.statusText)
  }

  console.log("response.body", response.body)

  // This data is a ReadableStream
  const stream = response.body
  if (!stream) {
    alert("Sorry the robots stopped responding. You can try again.")
    return
  }

  const reader = stream.getReader()
  const decoder = new TextDecoder()
  let done = false
  let responseString = ""

  console.log("reading stream")

  while (!done) {
    const { value, done: doneReading } = await reader.read()
    done = doneReading
    responseString += decoder.decode(value)
    onData(responseString)
  }

  if (onDone) {
    onDone()
  }

  return
}

// use this hook to fetch data from a stream
// and wait for the full result
export const useResponseFromPrompt = async (prompt: string) => {
  const response = await fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
    }),
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  // This data is a ReadableStream
  const data = response.body
  if (!data) {
    return ""
  }

  const reader = data.getReader()
  const decoder = new TextDecoder()
  let done = false
  let responseString = ""

  while (!done) {
    const { value, done: doneReading } = await reader.read()
    done = doneReading
    const chunkValue = decoder.decode(value)
    responseString += chunkValue
  }

  return responseString
}
