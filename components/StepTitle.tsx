import React, { useContext, useEffect, useState } from "react"
import { AppContext } from "./AppContext"
import Heading from "./ui/Heading"
import { useStreamingDataFromPrompt } from "../lib/openai/hooks"
import untruncateJson from "untruncate-json"
import LoadingAnimation from "./LoadingAnimation"
import RadioGroupCards from "./RadioGroupCards"

const StepTitle = () => {
  const { genre } = useContext(AppContext)

  const [titles, setTitles] = useState<string[]>([])
  const [title, setTitle] = useState<string>("")

  useEffect(() => {
    generateTitles()
  }, [])

  const generateTitles = async () => {
    const prompt = `Generate 7 different titles for a ${genre} movie in JSON format as an array of strings`
    setTitles([])

    await useStreamingDataFromPrompt({
      prompt,
      onData: (titleStream) => {
        try {
          const titleOptions = JSON.parse(untruncateJson(titleStream))
          setTitles(titleOptions)
        } catch (error) {
          console.error(error)
        }
      },
      onError: () => {
        console.log("Title generation failed, retry...")
        generateTitles()
      },
    })
  }

  return (
    <div className="relative z-10 max-w-3xl text-left mx-auto text-center">
      <Heading>Choose a Title</Heading>
      {titles.length ? (
        <RadioGroupCards
          selectedOption={title}
          onSelect={(option) => {
            setTitle(option)
          }}
          options={titles}
          variant="large"
        />
      ) : (
        <LoadingAnimation />
      )}
    </div>
  )
}

export default StepTitle
