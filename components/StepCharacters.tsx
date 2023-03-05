import React, { useContext, useEffect, useState } from "react"
import { AppContext } from "./AppContext"
import {
  useResponseFromPrompt,
  useStreamingDataFromPrompt,
  Message,
} from "../lib/openai/hooks"
import Heading from "./ui/Heading"
import CharacterCard from "./CharacterCard"
import NextButton from "./ui/NextButton"
import { Character } from "./Types"
import LoadingAnimation from "./LoadingAnimation"

const StepCharacters = () => {
  const context = useContext(AppContext)
  const [hero, setHero] = useState<Character | null>(null)
  const [villain, setVillain] = useState<Character | null>(null)
  const [mainsComplete, setMainsComplete] = useState<boolean>(false)
  const [supporting, setSupporting] = useState<Character[]>([])
  const [supportingComplete, setSupportingComplete] = useState<boolean>(false)

  // can get celebrity images from https://www.themoviedb.org/documentation/api

  useEffect(() => {
    createMainCharacters()
  }, [])

  useEffect(() => {
    if (mainsComplete) {
      createSupportingCharacters()
    }
  }, [mainsComplete])

  const createHero = async () => {
    const promptHeroName = `Generate a character name for a protagonist for a ${context.genre} story with the plot of "${context.logline}". Only respond with the name, nothing else.`
    let heroName = await useResponseFromPrompt(promptHeroName)
    heroName = heroName.trim().replace(/\.$/, "")
    setHero({ name: heroName, description: "" })

    const promptHeroDesc = `Generate a 2 sentence character description for a protagonist named ${heroName} for a ${context.genre} movie based on the logline "${context.logline}"`
    await useStreamingDataFromPrompt({
      prompt: promptHeroDesc,
      onData: (description) => {
        setHero({ name: heroName, description })
      },
    })
    return
  }

  const createVillain = async () => {
    const promptVillainName = `Generate a character name for an antagonist for a ${context.genre} story with the plot of "${context.logline}". Only respond with the name, nothing else.`
    let villainName = await useResponseFromPrompt(promptVillainName)
    villainName = villainName.trim().replace(/\.$/, "")
    setVillain({ name: villainName, description: "" })

    const promptVillainDesc = `Generate a 2 sentence character description for an antagonist named ${villainName} for a ${context.genre} movie based on the logline "${context.logline}"`
    await useStreamingDataFromPrompt({
      prompt: promptVillainDesc,
      onData: (description) => {
        setVillain({ name: villainName, description })
      },
    })
    return
  }

  const createMainCharacters = async () => {
    try {
      await createHero()
      await createVillain()
    } catch (error) {
      console.error(error)
      alert("Sorry there was a problem with the robots.")
    }
  }

  const createSupportingCharacters = async () => {
    if (hero && villain) {
      const promptSupportingNames = `Generate names for supporting characters for a ${context.genre} story with the plot of "${context.logline}". Respond with the names as a comma separated strings. Do not number the names.`
      const supportingNames = await useResponseFromPrompt(promptSupportingNames)

      const supportingArray = supportingNames.split(",").slice(0, 5)
      let supportingCharacters: Character[] = []
      const messages: Message[] = []

      for (let i = 0; i < supportingArray.length; i++) {
        const supportingName = supportingArray[i]
          .replace(/^\d+\.\s/, "")
          .trim()
          .replace(/\.$/, "")

        supportingCharacters[i] = { name: supportingName, description: "" }
        setSupporting([...supportingCharacters])
        if (i === 0) {
          messages.push({
            role: "user",
            content: `Generate a 2 sentence description for a supporting character named ${supportingName} for a ${context.genre} movie based on the logline "${context.logline}". The main character is ${hero.name}. ${hero.description} The antagonist is ${villain.name}. ${villain.description}`,
          })
        } else {
          messages.push({
            role: "user",
            content: `Generate a another supporting character named ${supportingName}.`,
          })
        }

        await useStreamingDataFromPrompt({
          messages,
          onData: (description) => {
            supportingCharacters[i] = { name: supportingName, description }
            setSupporting([...supportingCharacters])
          },
        })
        messages.push({
          role: "assistant",
          content: supportingCharacters[i].description,
        })
      }
      setSupportingComplete(true)
    } else {
      alert("Sorry, there was a problem with the robots again.")
    }
  }

  const onRerollHero = async () => {
    setHero(null)
    await createHero()
  }

  const onRerollVillain = async () => {
    setVillain(null)
    await createVillain()
  }

  const onCompleteStep = () => {
    context.setStep(2)
  }

  return (
    <div className="relative z-10 max-w-3xl text-left mx-auto grid gap-8">
      <div className="text-center">
        <Heading>Main Characters</Heading>
      </div>
      {hero ? (
        <CharacterCard
          character={hero}
          onReroll={mainsComplete ? undefined : onRerollHero}
        />
      ) : (
        <LoadingAnimation />
      )}
      {villain ? (
        <CharacterCard
          character={villain}
          onReroll={mainsComplete ? undefined : onRerollVillain}
        />
      ) : (
        <LoadingAnimation />
      )}
      {!mainsComplete && (
        <div className="text-center">
          <NextButton
            onClick={() => {
              setMainsComplete(true)
            }}
            disabled={!hero?.description || !villain?.description}
          />
        </div>
      )}
      {mainsComplete && (
        <div className="grid gap-8 pt-16">
          <div className="text-center">
            <Heading>Supporting Characters</Heading>
          </div>
          {supporting.map((char) => (
            <CharacterCard key={char.name} character={char} />
          ))}
          {supportingComplete && (
            <div className="text-center">
              <NextButton
                onClick={() => {
                  setMainsComplete(true)
                }}
                disabled={!hero?.description || !villain?.description}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default StepCharacters
