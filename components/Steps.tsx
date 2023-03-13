import React, { useContext, useEffect } from "react"
import { AppContext } from "./AppContext"
import StepGenre from "./StepGenre"
import StepTitle from "./StepTitle"
import StepCharacters from "./StepCharacters"
import StepActs from "./StepActs"
import StartOver from "./StartOver"

const Steps: React.FC = () => {
  const { step } = useContext(AppContext)

  console.log("Steps " + step)

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [step])

  return (
    <div className="w-full relative z-10">
      <div className="h-full min-h-[50vw] flex flex-col items-center justify-center mx-auto relative z-10 pt-40 sm:pt-60">
        {step === 0 && <StepGenre />}
        {step === 1 && <StepTitle />}
        {step === 2 && <StepCharacters />}
        {step === 3 && <StepActs />}
        {step === 4 && (
          <div>This is as far as I've gotten so far. Still in progress!</div>
        )}
      </div>
      {step > 0 && <StartOver />}
    </div>
  )
}

export default Steps
