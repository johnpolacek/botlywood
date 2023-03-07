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

const StepCharacterSupporting = () => {
  const { logline, genre, characters, setCharacters } = useContext(AppContext)
  const [supportingCharacters, setSupportingCharacters] = useState<Character[]>(
    []
  )
  const [supporting, setSupporting] = useState<Character | null>(null)
  const [numCharacters, setNumCharacters] = useState<number | null>(null)

  // require between 3-5 characters
  useEffect(() => {
    setNumCharacters(Math.floor(Math.random() * 3) + 3)
  }, [])

  useEffect(() => {
    if (numCharacters && supportingCharacters.length < numCharacters) {
      createSupporting()
    }
  }, [supportingCharacters.length, numCharacters])

  const createSupporting = async () => {
    const promptSupportingName = `Generate a character name with the initials ${getRandomInitials()} for a supporting character for a ${genre} story with the plot of "${logline}". Only respond with the name, nothing else.`
    let supportingName = await useResponseFromPrompt(promptSupportingName)
    console.log({ supportingName })
    supportingName = supportingName.trim().replace(/\.$/, "")
    setSupporting({ name: supportingName, description: "" })

    const promptSupportingDesc = `Generate a 2 sentence character description for a supporting character named ${supportingName} for a ${genre} movie with a plot of "${logline}"`
    await useStreamingDataFromPrompt({
      prompt: promptSupportingDesc,
      onData: (description) => {
        setSupporting({ name: supportingName, description })
      },
      onError: () => {
        console.log("streaming error... retry")
        onRerollSupporting()
      },
    })
    return
  }

  const onRerollSupporting = async () => {
    setSupporting(null)
    await createSupporting()
  }

  return (
    <div className="relative z-10 text-left mx-auto grid gap-8 w-full">
      <div className="text-center">
        {numCharacters && (
          <Heading
            children={`Supporting Character ${
              supportingCharacters.length + 1
            } / ${numCharacters}`}
          />
        )}
      </div>
      {supporting ? (
        <CharacterCard character={supporting} onReroll={onRerollSupporting} />
      ) : (
        <LoadingAnimation />
      )}
      <div className="text-center">
        <NextButton
          onClick={() => {
            if (supporting) {
              const newSupporting = [...supportingCharacters, supporting]
              if (newSupporting.length === numCharacters) {
                setCharacters({
                  hero: characters?.hero,
                  villain: characters?.villain,
                  supporting: newSupporting,
                })
              } else {
                setSupportingCharacters(newSupporting)
                setSupporting(null)
              }
            }
          }}
          disabled={supporting?.description === ""}
        />
      </div>
    </div>
  )
}

export default StepCharacterSupporting
