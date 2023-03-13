import React, { useContext, useEffect, useState } from "react"
import { AppContext } from "./AppContext"
import FadeIn from "./ui/FadeIn"
import untruncateJson from "untruncate-json"
import { useStreamingDataFromPrompt } from "../lib/openai/hooks"
import NextButton from "./ui/NextButton"
import TitleFont from "./TitleFont"
import { getFontClassFromName } from "./util/text"

const StepActs = () => {
  const {
    title,
    titleFont,
    colorScheme,
    genre,
    plot,
    acts,
    setActs,
    incrementStep,
  } = useContext(AppContext)

  useEffect(() => {
    generateActs()
  }, [])

  const generateActs = async () => {
    const prompt = `Generate 3 acts for a ${genre} movie based on the plot "${plot}". Respond in JSON format as an array of strings in the form of {acts: []}`
    await useStreamingDataFromPrompt({
      prompt,
      onData: (actsString) => {
        try {
          const actsStream = JSON.parse(untruncateJson(actsString))
          const parseActs = {
            ...actsStream,
            acts: actsStream.acts.map((act) => act.replace(/Act \d+: /, "")),
          }
          setActs(parseActs.acts)
        } catch (error) {
          console.error(error)
        }
      },
      onError: () => {
        console.log("Acts generation failed, retry...")
        generateActs()
      },
    })
  }

  const onCompleteStep = () => {
    incrementStep()
  }

  console.log({ acts })

  return (
    <div className="relative z-10 max-w-3xl text-left mx-auto">
      <FadeIn>
        <TitleFont
          text={title}
          color={colorScheme?.main || "white"}
          fontClass={getFontClassFromName(titleFont)}
        />
      </FadeIn>
      <div className="w-full min-h-[540px] bg-[rgba(0,0,0,.75)] mt-8 py-4 px-8 border-4 border-[rgba(255,255,255,.1)] rounded-lg">
        {acts.map((act, i) => (
          <div className="w-full pb-4">
            <h3 className="w-full text-3xl font-bold pb-4 text-center">
              Act {i + 1}
            </h3>
            <p className="text-lg pb-4">{act}</p>
          </div>
        ))}
      </div>
      <div className="text-center pt-12">
        <NextButton
          disabled={acts.length < 3}
          onClick={() => {
            incrementStep()
          }}
        />
      </div>
    </div>
  )
}

export default StepActs
