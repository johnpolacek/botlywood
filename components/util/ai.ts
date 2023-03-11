import { Character } from "../Types"
import {
  useImageResponseFromPrompt,
  useResponseFromPrompt,
} from "../../lib/openai/hooks"
import { getRandomInitials } from "./text"

export const getCharacterImage = async ({
  character,
  genre,
}: {
  character: Character
  genre: string
}) => {
  const response = await useImageResponseFromPrompt(
    `Beautiful cinematic movie still of a famous hollywood actor playing ${
      character?.name
    }, the hero in a ${genre} movie. ${character?.description.split(".")[0]}`,
    1
  )
  const data = await response.json()
  return data.images[0]
}

export const getCharacterName = async ({
  genre,
  plot,
  characterType,
}: {
  genre: string
  plot: string
  characterType: string
}) => {
  const prompt = `Generate a character name with the initials ${getRandomInitials()} for a ${characterType} for a ${genre} story with the plot of "${plot}". Only respond with the name, nothing else.`
  let name = await useResponseFromPrompt(prompt)
  console.log(getCharacterName, { name })
  if (!name) {
    name = await useResponseFromPrompt(prompt)
  }
  return name.trim().replace(/\.$/, "")
}
