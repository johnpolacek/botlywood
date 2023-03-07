const NextButton = ({
  disabled,
  onClick,
}: {
  disabled?: boolean
  onClick: (e: React.SyntheticEvent) => void
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type="submit"
      className="transition-all hover:scale-105 bg-indigo-600 disabled:bg-gray-600 disabled:opacity-50 rounded-xl text-white font-medium text-xl sm:text-3xl py-4 pl-12 pr-16 mt-2 mb-4"
    >
      <span className="inline-block relative">
        Next{" "}
        <span className="font-thin text-4xl absolute -top-2 -right-8 pt-px">
          »
        </span>
      </span>
    </button>
  )
}

export default NextButton
