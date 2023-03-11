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
  onError,
  onDone,
}: {
  onData: (data: string) => void
  prompt?: string
  messages?: Message[]
  onError?: () => void
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

  console.log("reading stream...")

  setTimeout(() => {
    if (responseString === "") {
      console.log("stream response timeout")
      if (onError) {
        onError()
      }
      done = true
    }
  }, 1000)

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
  let retries = 0
  let responseString = ""
  const MAX_RETRIES = 3

  while (retries <= MAX_RETRIES && responseString === "") {
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

    const data = response.body
    if (!data) {
      console.log("Empty ReadableStream response from /api/generate")
      retries++
      continue
    }

    const reader = data.getReader()
    const decoder = new TextDecoder()
    let done = false

    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      const chunkValue = decoder.decode(value)
      responseString += chunkValue
    }

    if (responseString === "") {
      console.log(
        "Empty response from /api/generate on attempt #" + (retries + 1)
      )
      retries++
      responseString = ""
    }
  }

  if (responseString === "") {
    throw new Error(`Max retries (${MAX_RETRIES}) exceeded`)
  }

  return responseString
}

// use this hook to fetch data from a stream
// and wait for the full result
export const useImageResponseFromPrompt = async (
  prompt: string,
  numImages: number
) => {
  return await fetch("/api/generateImage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
      n: numImages,
    }),
  })
}
