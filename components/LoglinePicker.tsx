import React, { useContext } from "react"
import { AppContext } from "./AppContext"
import Heading from "./ui/Heading"
import RadioGroupCards from "./RadioGroupCards"
import LoadingAnimation from "./LoadingAnimation"

const LoglinePicker: React.FC = () => {
	const { logline, setLogline, loglineOptions } = useContext(AppContext)

	return (
		<div className="my-12 items-center sm:space-x-3 max-w-4xl mx-auto">
			<label>
				<>
					<Heading>Choose a Plot Summary</Heading>
					{loglineOptions.length ? (
						<RadioGroupCards
							selectedOption={logline}
							onSelect={(option) => {
								setLogline(option)
							}}
							options={loglineOptions}
						/>
					) : (
						<LoadingAnimation />
					)}
					<p className="pt-6 text-lg">Or write your own</p>
					<textarea
						className="w-full rounded-lg mt-4 text-black"
						onChange={(e) => {
							setLogline(e.target.value)
						}}
						value={logline}
					/>
				</>
			</label>
		</div>
	)
}

export default LoglinePicker
