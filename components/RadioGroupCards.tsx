import { RadioGroup } from "@headlessui/react"
import { CheckCircleIcon } from "@heroicons/react/20/solid"
import classNames from "classnames"
import FadeIn from "./ui/FadeIn"

const RadioGroupCards = ({
  label,
  options,
  selectedOption,
  onSelect,
}: {
  label?: string
  options: string[]
  selectedOption?: string
  onSelect: (option: string) => void
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
            <FadeIn key={"radio-group-option-" + i} animateUp={true}>
              <RadioGroup.Option
                key={"radio-group-card-" + i}
                value={option}
                className={({ checked, active }) =>
                  classNames(
                    checked
                      ? "border-transparent"
                      : "border-[rgba(255,255,255,.25)]",
                    active ? "border-indigo-500 ring-2 ring-indigo-500" : "",
                    "relative flex p-4 bg-[rgba(0,0,0,.8)] cursor-pointer rounded-lg border-2 shadow-sm focus:outline-none"
                  )
                }
              >
                {({ checked, active }) => (
                  <>
                    <span className="flex flex-1">
                      <span className="flex flex-col text-lg pr-4">
                        {option}
                      </span>
                    </span>
                    <CheckCircleIcon
                      className={`text-indigo-200 h-5 w-5 ${
                        checked ? "" : "invisible"
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
            </FadeIn>
          )
        })}
      </div>
    </RadioGroup>
  )
}

export default RadioGroupCards
