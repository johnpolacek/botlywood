import React, { useContext } from "react"
import TextareaAutosize from "react-textarea-autosize"
import { AppContext } from "./AppContext"
import Heading from "./ui/Heading"
import RadioGroupCards from "./RadioGroupCards"
import LoadingAnimation from "./LoadingAnimation"
import Modifiers from "./Modifiers"

const LoglinePicker: React.FC = () => {
  const { logline, setLogline, loglineOptions } = useContext(AppContext)

  return (
    <div className="my-12 items-center sm:space-x-3 max-w-4xl mx-auto w-full min-h-[300px]">
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
          <TextareaAutosize
            className="w-full rounded-lg text-lg mt-4 text-black px-8 py-6"
            onChange={(e) => {
              setLogline(e.target.value)
            }}
            value={logline}
          />
          <Modifiers />
        </>
      </label>
    </div>
  )
}

export default LoglinePicker
