import { RadioGroup } from "@headlessui/react"
import { CheckCircleIcon } from "@heroicons/react/20/solid"
import classNames from "classnames"

const RadioGroupCards = ({
  label,
  options,
  selectedOption,
  onSelect,
  variant,
}: {
  label?: string
  options: string[]
  selectedOption?: string
  onSelect: (option: string) => void
  variant?: "normal" | "large"
}) => {
  return (
    <RadioGroup value={selectedOption} onChange={onSelect}>
      {label && (
        <RadioGroup.Label className="text-base font-semibold leading-6 text-white">
          {label}
        </RadioGroup.Label>
      )}

      <div className="flex flex-col mt-4 gap-y-4 text-white text-left w-full min-h-[300px]">
        {options.map((opt, i) => {
          const option = opt.replace(/^\d+\.\s/, "")
          return (
            <RadioGroup.Option
              key={"radio-group-card-" + i}
              value={option}
              className={({ checked, active }) =>
                classNames(
                  checked
                    ? "border-transparent"
                    : "border-[rgba(255,255,255,.25)]",
                  active ? "border-indigo-500 ring-2 ring-indigo-500" : "",
                  "relative bg-[rgba(0,0,0,.66)] flex cursor-pointer rounded-lg border-2 px-6 py-4 shadow-sm focus:outline-none"
                )
              }
            >
              {({ checked, active }) => (
                <>
                  <span className="flex flex-1">
                    <span
                      className={`flex flex-col  ${
                        variant === "large" ? "text-2xl px-12" : "text-lg pr-4"
                      }`}
                    >
                      {option}
                    </span>
                  </span>
                  <CheckCircleIcon
                    className={`text-indigo-600 ${checked ? "" : "invisible"} ${
                      variant === "large" ? "h-8 w-8" : "h-5 w-5"
                    }`}
                    aria-hidden="true"
                  />
                  <span
                    className={classNames(
                      active ? "border" : "border-2",
                      checked ? "border-indigo-500" : "border-transparent",
                      "pointer-events-none absolute -inset-px rounded-lg"
                    )}
                    aria-hidden="true"
                  />
                </>
              )}
            </RadioGroup.Option>
          )
        })}
      </div>
    </RadioGroup>
  )
}

export default RadioGroupCards
