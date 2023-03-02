import { RadioGroup } from "@headlessui/react"
import { CheckCircleIcon } from "@heroicons/react/20/solid"
import classNames from "classnames"

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

			<div className="mt-4 grid grid-cols-1 gap-y-4 text-white text-left">
				{options.map((option, i) => (
					<RadioGroup.Option
						key={"radio-group-card-" + i}
						value={option}
						className={({ checked, active }) =>
							classNames(
								checked ? "border-transparent" : "border-gray-600",
								active ? "border-indigo-500 ring-2 ring-indigo-500" : "",
								"relative flex cursor-pointer rounded-lg border-2 px-6 py-4 shadow-sm focus:outline-none"
							)
						}
					>
						{({ checked, active }) => (
							<>
								<span className="flex flex-1">
									<span className="flex flex-col pr-4">{option}</span>
								</span>
								<CheckCircleIcon
									className={classNames(
										!checked ? "invisible" : "",
										"h-5 w-5 text-indigo-600"
									)}
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
				))}
			</div>
		</RadioGroup>
	)
}

export default RadioGroupCards
