export function getRandomInitials() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const firstInitial = letters.charAt(
    Math.floor(Math.random() * letters.length)
  )
  const lastInitial = letters.charAt(Math.floor(Math.random() * letters.length))
  return `${firstInitial} ${lastInitial}`
}

export function trimString(str: string): string {
  // Define a regular expression to match spaces and punctuation
  const regex =
    /^[ \t\n\r\f\v!"#$%&'()*+,\-./:;<=>?@\[\\\]^_`{|}~]+|[ \t\n\r\f\v!"#$%&'()*+,\-./:;<=>?@\[\\\]^_`{|}~]+$/g

  // Use the regular expression to replace any spaces or punctuation at the beginning or end of the string
  return str.replace(regex, "")
}

export function loadGoogleFont(fontName: string): string {
  console.log({ fontName })
  const fontUrl = `https://fonts.googleapis.com/css2?family=${fontName.replace(
    / /g,
    "+"
  )}&display=swap`
  const className = `font-${fontName.replace(/ /g, "-").toLowerCase()}`

  const link = document.createElement("link")
  link.href = fontUrl
  link.rel = "stylesheet"
  link.onload = () => {
    document.documentElement.classList.add(className)
  }

  document.head.appendChild(link)

  const style = document.createElement("style")
  style.appendChild(
    document.createTextNode(
      `.${className} { font-family: '${fontName}', sans-serif; }`
    )
  )
  document.head.appendChild(style)

  return className
}

const lightColors: string[] = [
  "aliceblue",
  "lavender",
  "mistyrose",
  "ivory",
  "seashell",
  "floralwhite",
  "ghostwhite",
  "honeydew",
  "lemonchiffon",
  "beige",
  "linen",
  "lightcyan",
  "mintcream",
  "oldlace",
  "papayawhip",
  "cornsilk",
  "snow",
  "antiquewhite",
  "thistle",
  "lightgoldenrodyellow",
  "lavenderblush",
  "gainsboro",
  "lightyellow",
  "peachpuff",
  "wheat",
  "lightpink",
  "azure",
  "mistyrose",
  "honeydew",
  "lavender",
  "powderblue",
  "blanchedalmond",
  "lightcoral",
  "lavendergrey",
  "cornflowerblue",
  "lemonchiffon",
  "mintcream",
  "linen",
  "mistyrose",
  "antiquewhite",
  "ghostwhite",
  "bisque",
  "pink",
  "lavenderblush",
  "snow",
  "oldlace",
  "seashell",
  "ivory",
  "white",
  "honeydew",
  "lightyellow",
  "beige",
  "floralwhite",
  "papayawhip",
  "peachpuff",
  "moccasin",
  "navajowhite",
  "wheat",
  "blanchedalmond",
  "lemonchiffon",
  "khaki",
  "palegoldenrod",
  "lightgoldenrodyellow",
]

export function getLightOnDarkTextColor(): string {
  const randomIndex = Math.floor(Math.random() * lightColors.length)
  return lightColors[randomIndex]
}
