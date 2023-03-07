import React, { useContext, useEffect, useState } from "react"
import { AppContext } from "./AppContext"
import {
  useResponseFromPrompt,
  useStreamingDataFromPrompt,
} from "../lib/openai/hooks"
import Heading from "./ui/Heading"
import CharacterCard from "./CharacterCard"
import NextButton from "./ui/NextButton"
import { Character } from "./Types"
import LoadingAnimation from "./LoadingAnimation"
import { getRandomInitials } from "./util/text"

const StepCharacterVillain = () => {
  const { logline, genre, characters, setCharacters } = useContext(AppContext)
  const [villain, setVillain] = useState<Character | null>(null)

  // can get celebrity images from https://www.themoviedb.org/documentation/api

  useEffect(() => {
    createVillain()
  }, [])

  const createVillain = async () => {
    const promptVillainName = `Generate a character name with the initials ${getRandomInitials()} for a villain character in a ${genre} story with the plot of "${logline}". Only respond with the name, nothing else.`
    let villainName = await useResponseFromPrompt(promptVillainName)
    console.log({ villainName })
    villainName = villainName.trim().replace(/\.$/, "")
    setVillain({ name: villainName, description: "" })

    const promptVillainDesc = `Generate a 2 sentence character description for a villain character named ${villainName} for a ${genre} movie based on the logline "${logline}"`
    await useStreamingDataFromPrompt({
      prompt: promptVillainDesc,
      onData: (description) => {
        setVillain({ name: villainName, description })
      },
      onError: () => {
        console.log("streaming error... retry")
        onRerollVillain()
      },
    })
    return
  }

  const onRerollVillain = async () => {
    setVillain(null)
    await createVillain()
  }

  return (
    <div className="relative z-10 text-left mx-auto grid gap-8 w-full">
      <div className="text-center">
        <Heading>Our Antagonist</Heading>
      </div>
      {villain ? (
        <CharacterCard character={villain} onReroll={onRerollVillain} />
      ) : (
        <LoadingAnimation />
      )}
      <div className="text-center">
        <NextButton
          onClick={() => {
            if (villain) {
              setCharacters({ hero: characters?.hero, villain })
            }
          }}
          disabled={villain?.description === ""}
        />
      </div>
    </div>
  )
}

export default StepCharacterVillain
