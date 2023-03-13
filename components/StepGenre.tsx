import React, { useContext } from "react"
import { AppContext } from "./AppContext"
import GenrePicker from "./GenrePicker"
import PlotPicker from "./PlotPicker"
import NextButton from "./ui/NextButton"
import StartOver from "./StartOver"

const StepGenre = () => {
  const context = useContext(AppContext)

  const onCompleteStep = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    context.incrementStep()
  }

  return (
    <div className="relative z-10">
      <div className="min-h-[300px] min-w-[640px]">
        <GenrePicker />
        {context.genre && <PlotPicker />}
      </div>
      {context.genre && (
        <>
          <NextButton
            onClick={onCompleteStep}
            disabled={!context.genre || !context.plot}
          />
          <StartOver />
        </>
      )}
    </div>
  )
}

export default StepGenre
