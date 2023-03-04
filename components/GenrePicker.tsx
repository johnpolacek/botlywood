import React, { useContext } from "react"
import { AppContext } from "./AppContext"
import { useStreamingDataFromPrompt } from "../lib/openai/hooks"
import untruncateJson from "untruncate-json"
import Heading from "./ui/Heading"

const GenrePicker: React.FC = () => {
  const { genre, setGenre, setLoglineOptions } = useContext(AppContext)

  const onChangeGenre = async (genre: string) => {
    const prompt = `Generate 5 random plot ideas for a ${genre} movie in JSON format as an array of strings`
    setLoglineOptions([])

    await useStreamingDataFromPrompt(prompt, (loglineOptionsString) => {
      try {
        const loglineOptions = JSON.parse(untruncateJson(loglineOptionsString))
        setLoglineOptions(loglineOptions)
      } catch (error) {
        console.error(error)
      }
    })
  }

  return (
    <div className="sm:mb-4 items-center sm:space-x-3 max-w-lg mx-auto relative z-10">
      <label>
        <Heading>Choose a genre for your movie</Heading>
        <select
          className="text-black rounded-lg"
          value={genre}
          onChange={(e) => {
            setGenre(e.target.value)
            onChangeGenre(e.target.value)
          }}
        >
          <option value="">Choose a Genre...</option>
          <option>Action</option>
          <option>Adventure</option>
          <option>Animation</option>
          <option>Biopic</option>
          <option>Classic Cinema</option>
          <option>Comedy</option>
          <option>Crime</option>
          <option>Disaster</option>
          <option>Family</option>
          <option>Fantasy</option>
          <option>Hallmark</option>
          <option>Historical</option>
          <option>Holiday</option>
          <option>Horror</option>
          <option>Marvel Cinematic Universe</option>
          <option>Martial Arts</option>
          <option>Musical</option>
          <option>Mystery</option>
          <option>Noir</option>
          <option>Paranormal</option>
          <option>Romance</option>
          <option>Romantic Comedy</option>
          <option>Science Fiction</option>
          <option>Spy</option>
          <option>Superhero</option>
          <option>Thriller</option>
          <option>Urban</option>
          <option>War</option>
          <option>Western</option>
        </select>
      </label>
    </div>
  )
}

export default GenrePicker
