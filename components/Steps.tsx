import React, { useContext, useEffect } from "react"
import { AppContext } from "./AppContext"
import StepGenre from "./StepGenre"
import StepCharacters from "./StepCharacters"
import StepTitle from "./StepTitle"

const Steps: React.FC = () => {
  const { step } = useContext(AppContext)

  return (
    <div className="w-full relative z-10">
      <div className="h-full min-h-[50vw] flex flex-col items-center justify-center mx-auto relative z-10 pt-40 sm:pt-80">
        {step === 0 && <StepGenre />}
        {step === 1 && <StepCharacters />}
        {step === 2 && <StepTitle />}
      </div>
    </div>
  )
}

export default Steps
