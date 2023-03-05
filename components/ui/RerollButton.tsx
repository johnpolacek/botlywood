import RandomGraphic from "./graphics/Random"

const RerollButton = ({ onReroll }: { onReroll: () => void }) => {
  return (
    <button
      className="bg-indigo-600 text-lg px-8 py-2 rounded-lg"
      onClick={(e) => {
        e.preventDefault()
        onReroll()
      }}
    >
      <RandomGraphic />
      <span>Re-Roll</span>
    </button>
  )
}

export default RerollButton
