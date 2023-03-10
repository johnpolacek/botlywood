const TitleFont = ({
  text,
  fontClass,
  color,
}: {
  text: string
  fontClass?: string
  color?: string
}) => {
  return (
    <div
      style={{
        color: color || "white",
        textShadow: "1px 1px 4px black",
      }}
      className={`text-center tracking-wide text-6xl ${fontClass}`}
    >
      {text}
    </div>
  )
}

export default TitleFont
