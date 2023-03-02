const NextButton = ({
	disabled,
	onClick,
}: {
	disabled?: boolean
	onClick: (e: React.SyntheticEvent) => void
}) => {
	return (
		<button
			onClick={onClick}
			type="submit"
			className={`transition-all bg-indigo-600 hover:scale-105 rounded-xl text-white font-medium text-xl sm:text-3xl py-4 pl-12 pr-16 mt-2 mb-4 ${
				disabled ? "opacity-0 pointer-events-none" : ""
			}`}
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
