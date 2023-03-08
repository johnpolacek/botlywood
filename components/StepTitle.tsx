import React, { useContext, useEffect, useState } from "react"
import { AppContext } from "./AppContext"
import Heading from "./ui/Heading"
import { useStreamingDataFromPrompt } from "../lib/openai/hooks"
import LoadingAnimation from "./LoadingAnimation"
import RadioGroupTitleCards from "./RadioGroupTitleCards"
import untruncateJson from "untruncate-json"
import { TitleSelection } from "./Types"
import NextButton from "./ui/NextButton"

const StepTitle = () => {
  const {
    genre,
    plot,
    title,
    setTitle,
    setTitleFont,
    setColorScheme,
    incrementStep,
  } = useContext(AppContext)

  const [titles, setTitles] = useState<string[]>([])

  useEffect(() => {
    generateTitles()
  }, [])

  const generateTitles = async () => {
    const prompt = `You are an API for that will generate 5 different titles for a ${genre} movie: ${plot}. You must reply in JSON format like {titles:["title","another","one more","other one","last"]}`
    setTitles([])

    await useStreamingDataFromPrompt({
      prompt,
      onData: (titleStream) => {
        try {
          const data = JSON.parse(untruncateJson(titleStream))
          if (data.titles?.length) {
            const newTitles = data.titles
              .map((t: string) => (t.includes(": A ") ? t.split(": A ")[1] : t))
              .map((t: string) =>
                t.includes(": The ") ? t.split(": The ")[0] : t
              )
            setTitles(newTitles)
          }
        } catch (error) {
          // swallow errors console.error(error, { titleStream })
        }
      },
      onError: () => {
        console.log("Title generation failed, retry...")
        generateTitles()
      },
      onDone: () => {
        if (titles.length === 5) {
          console.log("onDone success")
        } else {
          console.log("onDone error?", titles)
          // generateTitles()
          // retry?
        }
      },
    })
  }

  return (
    <div className="relative z-10 max-w-4xl text-center mx-auto">
      <Heading>Choose a Title</Heading>
      {titles.length ? (
        <>
          <RadioGroupTitleCards
            selectedOption={title}
            onSelect={(titleSelection: TitleSelection) => {
              setTitle(titleSelection.title)
              setTitleFont(titleSelection.font)
              setColorScheme({ main: titleSelection.color })
            }}
            options={titles}
          />
          <NextButton
            disabled={titles.length < 5}
            onClick={() => {
              incrementStep()
            }}
          />
        </>
      ) : (
        <LoadingAnimation />
      )}
    </div>
  )
}

export default React.memo(StepTitle)
