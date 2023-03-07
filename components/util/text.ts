export function getRandomInitials() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const firstInitial = letters.charAt(
    Math.floor(Math.random() * letters.length)
  )
  const lastInitial = letters.charAt(Math.floor(Math.random() * letters.length))
  return `${firstInitial} ${lastInitial}`
}

export async function loadGoogleFont(fontFamily: string): Promise<string> {
  // Generate URL for Google Fonts API request
  const url = `https://fonts.googleapis.com/css?family=${encodeURIComponent(
    fontFamily
  )}`

  // Load the font asynchronously
  await new Promise<void>((resolve, reject) => {
    const link = document.createElement("link")
    link.href = url
    link.rel = "stylesheet"

    link.onload = () => {
      resolve()
    }

    link.onerror = () => {
      reject(new Error(`Failed to load font: ${fontFamily}`))
    }

    document.head.appendChild(link)
  })

  // Generate class name for the font
  const className = `font-${fontFamily.replace(/ /g, "-").toLowerCase()}`

  return className
}
