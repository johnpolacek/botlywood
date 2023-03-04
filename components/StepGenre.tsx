import React, { useContext } from "react"
import { AppContext } from "./AppContext"
import GenrePicker from "./GenrePicker"
import LoglinePicker from "./LoglinePicker"
import NextButton from "./ui/NextButton"

const StepGenre = () => {
  const context = useContext(AppContext)

  const onCompleteStep = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    context.setStep(1)
  }

  return (
    <div className="relative z-10">
      <GenrePicker />
      {context.genre && <LoglinePicker />}
      <NextButton
        onClick={onCompleteStep}
        disabled={!context.genre && !context.logline}
      />
    </div>
  )
}

export default StepGenre
