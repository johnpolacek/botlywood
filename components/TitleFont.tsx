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
      style={{ color: color || "white" }}
      className={`text-center tracking-wide text-5xl ${fontClass}`}
    >
      {text}
    </div>
  )
}

export default TitleFont
