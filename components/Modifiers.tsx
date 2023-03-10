import LoadingAnimation from "./LoadingAnimation"
import ModifierButton from "./ui/ModifierButton"

type Modifier = {
  label: string
  modifier?: string
}

export default function Modifiers({
  disabled,
  modifiers,
  onModify,
  isLoading,
}: {
  disabled: boolean
  modifiers: Modifier[]
  onModify: (modifier: string) => void
  isLoading: boolean
}) {
  return (
    <>
      <div className="flex flex-wrap pt-4 gap-5 justify-center">
        {modifiers.map((modifier) => (
          <ModifierButton
            modifier={modifier.modifier}
            disabled={disabled}
            onModify={onModify}
            key={modifier.label}
          >
            {modifier.label}
          </ModifierButton>
        ))}
      </div>
      {isLoading && (
        <div className="-my-12">
          <LoadingAnimation />
        </div>
      )}
    </>
  )
}
