const ModifierButton = ({
  children,
  modifier,
  disabled,
  onModify,
}: {
  children: string
  onModify: (modifier: string) => void
  modifier?: string
  disabled?: boolean
}) => (
  <button
    disabled={disabled}
    onClick={() => {
      onModify(modifier || children.toLowerCase())
    }}
    className="transition-all duration-500 rounded-lg py-2 px-4 bg-indigo-800 text-white disabled:bg-gray-600 disabled:opacity-50"
  >
    {children}
  </button>
)

export default ModifierButton
