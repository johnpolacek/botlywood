import React, { useContext, useEffect, useState } from "react"
import { AppContext } from "./AppContext"
import {
  useResponseFromPrompt,
  useStreamingDataFromPrompt,
  useImageResponseFromPrompt,
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
  const [isStreaming, setIsStreaming] = useState<boolean>(false)

  const [image, setImage] = useState<string>('')
  // {"images":["https://oaidalleapiprodscus.blob.core.windows.net/private/org-7UV6VMAYHi0tPc9GbYDqCsAZ/user-En8018CpwdMhlSGB43AjNXvM/img-NhjUjiAQQ9yqS2SeB8g3rfHY.png?st=2023-03-07T02%3A54%3A51Z&se=2023-03-07T04%3A54%3A51Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-07T01%3A30%3A26Z&ske=2023-03-08T01%3A30%3A26Z&sks=b&skv=2021-08-06&sig=yrPQ0wbPVs9qJuZP3PkRH2ZquU/swht9SWCq4VkQVyQ%3D","https://oaidalleapiprodscus.blob.core.windows.net/private/org-7UV6VMAYHi0tPc9GbYDqCsAZ/user-En8018CpwdMhlSGB43AjNXvM/img-6sRKUOiLmNgve4vwqpmzBdxF.png?st=2023-03-07T02%3A54%3A51Z&se=2023-03-07T04%3A54%3A51Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-07T01%3A30%3A26Z&ske=2023-03-08T01%3A30%3A26Z&sks=b&skv=2021-08-06&sig=cC1BxYHnQc0gsr/2Un2F3vtTANIkipu2L6PCzedMHpo%3D","https://oaidalleapiprodscus.blob.core.windows.net/private/org-7UV6VMAYHi0tPc9GbYDqCsAZ/user-En8018CpwdMhlSGB43AjNXvM/img-ppcH77rOXAINt9MdAffHkqZc.png?st=2023-03-07T02%3A54%3A51Z&se=2023-03-07T04%3A54%3A51Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-07T01%3A30%3A26Z&ske=2023-03-08T01%3A30%3A26Z&sks=b&skv=2021-08-06&sig=aIfC1FhDhHNgpcA1joeU1FYZsOFjbZ/lXB8RsqVLwEg%3D","https://oaidalleapiprodscus.blob.core.windows.net/private/org-7UV6VMAYHi0tPc9GbYDqCsAZ/user-En8018CpwdMhlSGB43AjNXvM/img-duKhzh9Aq8Nc0F6eFMFKQTAd.png?st=2023-03-07T02%3A54%3A52Z&se=2023-03-07T04%3A54%3A52Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-07T01%3A30%3A26Z&ske=2023-03-08T01%3A30%3A26Z&sks=b&skv=2021-08-06&sig=o45And7yMcvZ76jmwjYZmNiXyUDQIEOuBV%2BTG8ugJO0%3D"]}

  useEffect(() => {
    if (!isStreaming && hero?.description) {
      getCharacterImage()
    }
  }, [!isStreaming && hero?.description])

  const getCharacterImage = async () => {
    const response = await useImageResponseFromPrompt(
      `Beautiful cinematic movie still of a famous hollywood actor playing ${hero?.name}, the hero in a ${genre} movie. ${hero?.description.split('.')[0]}`, 1
    )
    const data = await response.json()
    console.log({ data })
    setImage(data.images[0])
  }

  useEffect(() => {
    createHero()
  }, [])

  const createHero = async () => {
    setIsStreaming(true)
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
      onDone: () => {
        setIsStreaming(false)
      },
    })
    return
  }

  const onRerollHero = async () => {
    setHero(null)
    await createHero()
  }

  return (
    <div className="relative z-10 text-left mx-auto grid gap-8 w-full">
      <div className="text-center">
        <Heading>Main Character</Heading>
      </div>
      {hero ? (
        <CharacterCard character={hero} onReroll={onRerollHero} image={image} />
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
