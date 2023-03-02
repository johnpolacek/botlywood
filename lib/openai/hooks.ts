// use this hook to fetch data from a stream
// get the cumulative response as it is read
export const useStreamingDataFromPrompt = async (
	prompt: string,
	onData: (data: string) => void,
	onDone?: () => void
) => {
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
	const stream = response.body
	if (!stream) {
		alert("Sorry the robots stopped responding. You can try again.")
		return
	}

	const reader = stream.getReader()
	const decoder = new TextDecoder()
	let done = false
	let responseString = ""

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
