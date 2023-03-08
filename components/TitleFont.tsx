import { useEffect, useState } from "react"
import { getLightOnDarkTextColor } from "./util/text"

const TitleFont = ({
  text,
  fontClass,
}: {
  text: string
  fontClass?: string
}) => {
  const [color, setColor] = useState<string>("transparent")

  const colors: string[] = [
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
  ]

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * colors.length)
    setColor(colors[randomIndex])
  }, [])

  return (
    <div
      style={{ color }}
      className={`text-center tracking-wide text-5xl ${fontClass}`}
    >
      {text}
    </div>
  )
}

export default TitleFont
