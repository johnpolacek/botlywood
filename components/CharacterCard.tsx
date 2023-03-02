import { Character } from "./Types"
import LoadingAnimation from "./LoadingAnimation"

const CharacterCard = ({
	character,
	onReroll,
}: {
	character: Character
	onReroll?: () => {}
}) => {
	return (
		<div className="flex flex-col p-4 md:p-8 border border-indigo-900 rounded-lg">
			<div className="font-bold text-xl pb-2">{character.name}</div>
			{character.description ? (
				<>
					<div className="text-lg">{character.description}</div>
					{onReroll && (
						<div className="text-center pt-8 pb-2">
							<button
								className="bg-indigo-600 text-lg px-8 py-2 rounded-lg"
								onClick={(e) => {
									e.preventDefault()
									onReroll()
								}}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-5 h-5 relative -top-px -left-2 inline-block"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
									/>
								</svg>
								<span>Re-Roll</span>
							</button>
						</div>
					)}
				</>
			) : (
				<div>
					<LoadingAnimation />
				</div>
			)}
		</div>
	)
}

export default CharacterCard
