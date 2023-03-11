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
import wait from "waait"

interface StepCharacter {
  heading: string
  characterType: string
  onComplete: (character: Character) => void
}

const StepCharacter = ({
  heading,
  characterType,
  onComplete,
}: StepCharacter) => {
  const { plot, genre } = useContext(AppContext)
  const [character, setCharacter] = useState<Character | null>(null)
  const [isStreaming, setIsStreaming] = useState<boolean>(false)

  console.log("StepCharacter " + characterType)

  useEffect(() => {
    console.log("StepCharacter " + characterType + " useEffect")
    createCharacter()
  }, [])

  useEffect(() => {
    if (!isStreaming && character?.description) {
      getCharacterImage({ character: character, genre }).then((image) => {
        setCharacter({ ...character, image })
      })
    }
  }, [!isStreaming && character?.description])

  const createCharacter = async () => {
    console.log("createCharacter")
    setIsStreaming(true)
    const characterName = await getCharacterName({
      genre,
      plot,
      characterType,
    })
    setCharacter({ name: characterName, description: "" })

    const promptDesc = `Generate a 2 sentence character description for a ${characterType} named ${characterName} for a ${genre} movie based on the plot "${plot}"`
    await useStreamingDataFromPrompt({
      prompt: promptDesc,
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

  const onEditCharacter = async (characterEdit: Character) => {
    setCharacter(characterEdit)
  }

  return (
    <div className="relative z-10 text-left mx-auto grid gap-8 w-full">
      <FadeIn>
        <div className="text-center">
          <Heading>{heading}</Heading>
        </div>
      </FadeIn>
      {character ? (
        <FadeIn>
          <CharacterCard
            character={character}
            onReroll={onRerollCharacter}
            onEdit={onEditCharacter}
          />
        </FadeIn>
      ) : (
        <LoadingAnimation />
      )}
      {character && (
        <div className="text-center">
          <NextButton
            onClick={() => {
              onComplete(character)
              wait(500).then(() => {
                setCharacter(null)
              })
            }}
            disabled={!character.image}
          />
        </div>
      )}
    </div>
  )
}

export default StepCharacter
