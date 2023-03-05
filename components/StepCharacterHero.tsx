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
import { getRandomInitials } from "./util/string"

const StepCharacterHero = () => {
  const { logline, genre, setCharacters } = useContext(AppContext)
  const [hero, setHero] = useState<Character | null>(null)

  // can get celebrity images from https://www.themoviedb.org/documentation/api

  useEffect(() => {
    createHero()
  }, [])

  const createHero = async () => {
    const promptHeroName = `Generate a character name with the initials ${getRandomInitials()} for a protagonist for a ${genre} story with the plot of "${logline}". Only respond with the name, nothing else.`
    let heroName = await useResponseFromPrompt(promptHeroName)
    console.log({ heroName })
    heroName = heroName.trim().replace(/\.$/, "")
    setHero({ name: heroName, description: "" })

    const promptHeroDesc = `Generate a 2 sentence character description for a protagonist named ${heroName} for a ${genre} movie based on the logline "${logline}"`
    await useStreamingDataFromPrompt({
      prompt: promptHeroDesc,
      onData: (description) => {
        setHero({ name: heroName, description })
      },
      onError: () => {
        console.log("streaming error... retry")
        onRerollHero()
      },
    })
    return
  }

  const onRerollHero = async () => {
    setHero(null)
    await createHero()
  }

  return (
    <div className="relative z-10 max-w-3xl text-left mx-auto grid gap-8 w-full">
      <div className="text-center">
        <Heading>Main Character</Heading>
      </div>
      {hero ? (
        <CharacterCard character={hero} onReroll={onRerollHero} />
      ) : (
        <LoadingAnimation />
      )}
      <div className="text-center">
        <NextButton
          onClick={() => {
            if (hero) {
              setCharacters({ hero })
            }
          }}
          disabled={hero?.description === ""}
        />
      </div>
    </div>
  )
}

export default StepCharacterHero
