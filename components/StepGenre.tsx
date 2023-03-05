import React, { useContext } from "react"
import { AppContext } from "./AppContext"
import GenrePicker from "./GenrePicker"
import LoglinePicker from "./LoglinePicker"
import NextButton from "./ui/NextButton"

const StepGenre = () => {
  const context = useContext(AppContext)

  const onCompleteStep = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    context.incrementStep()
  }

  return (
    <div className="relative z-10">
      <div className="min-h-[300px]">
        <GenrePicker />
        {context.genre && <LoglinePicker />}
      </div>
      <NextButton
        onClick={onCompleteStep}
        disabled={!context.genre || !context.logline}
      />
    </div>
  )
}

export default StepGenre
