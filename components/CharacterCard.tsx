import { Character } from "./Types"
import LoadingAnimation from "./LoadingAnimation"
import RerollButton from "./ui/RerollButton"

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
							<RerollButton onReroll={onReroll} />
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
