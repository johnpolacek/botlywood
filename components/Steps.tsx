import React, { useContext, useEffect } from "react"
import { AppContext } from "./AppContext"
import StepGenre from "./StepGenre"
import StepCharacters from "./StepCharacters"
import StepTitle from "./StepTitle"
import StartOver from "./StartOver"

const Steps: React.FC = () => {
  const { step } = useContext(AppContext)

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [step])

  return (
    <div className="w-full relative z-10">
      <div className="h-full min-h-[50vw] flex flex-col items-center justify-center mx-auto relative z-10 pt-40 sm:pt-80">
        {step === 0 && <StepGenre />}
        {step === 1 && <StepTitle />}
        {step === 2 && <StepCharacters />}
      </div>
      {step > 0 && <StartOver />}
    </div>
  )
}

export default Steps
