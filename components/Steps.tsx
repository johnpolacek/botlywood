import React, { useContext, useEffect } from "react"
import { AppContext } from "./AppContext"
import StepGenre from "./StepGenre"
import StepCharacters from "./StepCharacters"
import StepActs from "./StepActs"

const Steps: React.FC = () => {
	const { step } = useContext(AppContext)

	return (
		<div className="-mt-80 pb-16 mx-auto relative z-10">
			{step === 0 && <StepGenre />}
			{step === 1 && <StepCharacters />}
			{step === 2 && <StepActs />}
		</div>
	)
}

export default Steps
