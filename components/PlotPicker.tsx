import React, { useContext, useEffect } from "react"
import TextareaAutosize from "react-textarea-autosize"
import { AppContext } from "./AppContext"
import Heading from "./ui/Heading"
import RadioGroupCards from "./RadioGroupCards"
import FadeIn from "./ui/FadeIn"
import LoadingAnimation from "./LoadingAnimation"
import Modifiers from "./Modifiers"

const PlotPicker: React.FC = () => {
  const { plot, setPlot, plotOptions } = useContext(AppContext)

  return (
    <div className="my-12 items-center sm:space-x-3 max-w-4xl mx-auto w-full min-h-[300px]">
      <label>
        <FadeIn animateUp={true}>
          <Heading>Choose a Plot Summary</Heading>
          {plotOptions.length ? (
            <RadioGroupCards
              selectedOption={plot}
              onSelect={(option) => {
                setPlot(option)
              }}
              options={plotOptions}
            />
          ) : (
            <LoadingAnimation />
          )}
          <p className="pt-6 text-lg">Or write your own</p>
          <TextareaAutosize
            className="w-full rounded-lg text-lg mt-4 text-black px-8 py-6"
            onChange={(e) => {
              setPlot(e.target.value)
            }}
            value={plot}
          />
          <Modifiers />
        </FadeIn>
      </label>
    </div>
  )
}

export default PlotPicker
