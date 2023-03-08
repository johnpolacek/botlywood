import React, { useContext, useEffect, useState } from "react"
import { AppContext } from "./AppContext"
import { useStreamingDataFromPrompt } from "../lib/openai/hooks"
import Heading from "./ui/Heading"
import CharacterCard from "./CharacterCard"
import NextButton from "./ui/NextButton"
import { Character } from "./Types"
import LoadingAnimation from "./LoadingAnimation"
import { getCharacterName, getCharacterImage } from "./util/ai"
import FadeIn from "./ui/FadeIn"

const StepCharacterHero = () => {
  const { plot, genre, setCharacters } = useContext(AppContext)
  const [character, setCharacter] = useState<Character | null>(null)
  const [isStreaming, setIsStreaming] = useState<boolean>(false)

  useEffect(() => {
    if (!isStreaming && character?.description) {
      getCharacterImage({ character: character, genre }).then((image) => {
        setCharacter({ ...character, image })
      })
    }
  }, [!isStreaming && character?.description])

  useEffect(() => {
    createCharacter()
  }, [])

  const createCharacter = async () => {
    setIsStreaming(true)
    const characterName = await getCharacterName({
      genre,
      plot,
      characterType: "protagonist",
    })
    setCharacter({ name: characterName, description: "" })

    const promptHeroDesc = `Generate a 2 sentence character description for a protagonist named ${characterName} for a ${genre} movie based on the plot "${plot}"`
    await useStreamingDataFromPrompt({
      prompt: promptHeroDesc,
      onData: (description) => {
        setCharacter({ name: characterName, description })
      },
      onError: () => {
        console.log("streaming error... retry")
        onRerollCharacter()
      },
      onDone: () => {
        setIsStreaming(false)
      },
    })
    return
  }

  const onRerollCharacter = async () => {
    setCharacter(null)
    await createCharacter()
  }

  return (
    <div className="relative z-10 text-left mx-auto grid gap-8 w-full">
      <FadeIn>
        <div className="text-center">
          <Heading>Main Character</Heading>
        </div>
      </FadeIn>
      {character ? (
        <FadeIn>
          <CharacterCard character={character} onReroll={onRerollCharacter} />
        </FadeIn>
      ) : (
        <LoadingAnimation />
      )}
      <div className="text-center">
        <NextButton
          onClick={() => {
            if (character) {
              setCharacters({ hero: character })
            }
          }}
          disabled={character?.image === ""}
        />
      </div>
    </div>
  )
}

export default StepCharacterHero
