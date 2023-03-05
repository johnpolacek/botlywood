import React, { useContext } from "react"
import { AppContext } from "./AppContext"
import { useStreamingDataFromPrompt } from "../lib/openai/hooks"
import untruncateJson from "untruncate-json"
import Heading from "./ui/Heading"
import RandomGraphic from "./ui/graphics/Random"

const genres = [
  "Action",
  "Adventure",
  "Animation",
  "Biopic",
  "Classic Cinema",
  "Comedy",
  "Crime",
  "Disaster",
  "Family",
  "Fantasy",
  "Hallmark",
  "Historical",
  "Holiday",
  "Horror",
  "Marvel Cinematic Universe",
  "Martial Arts",
  "Musical",
  "Mystery",
  "Noir",
  "Paranormal",
  "Romance",
  "Romantic Comedy",
  "Science Fiction",
  "Spy",
  "Superhero",
  "Thriller",
  "Urban",
  "War",
  "Western",
]

const GenrePicker: React.FC = () => {
  const { genre, setGenre, setLoglineOptions } = useContext(AppContext)

  const onChangeGenre = async (genre: string) => {
    const prompt = `Generate 5 random plot ideas for a ${genre} movie in JSON format as an array of strings`
    setLoglineOptions([])

    await useStreamingDataFromPrompt({
      prompt,
      onData: (loglineOptionsString) => {
        try {
          const loglineOptions = JSON.parse(
            untruncateJson(loglineOptionsString)
          )
          setLoglineOptions(loglineOptions)
        } catch (error) {
          console.error(error)
        }
      },
    })
  }

  return (
    <div className="sm:mb-4 items-center sm:space-x-3 max-w-lg mx-auto relative z-10">
      <label className="flex flex-col gap-4">
        <Heading>Choose a genre for your movie</Heading>
        <select
          className="text-black rounded-lg text-center py-3 text-xl"
          value={genre}
          onChange={(e) => {
            setGenre(e.target.value)
            onChangeGenre(e.target.value)
          }}
        >
          <option value="">Choose a Genre...</option>
          {genres.map((g) => (
            <option key={g}>{g}</option>
          ))}
        </select>
        <button
          onClick={() => {
            const newGenre = genres[Math.floor(Math.random() * genres.length)]
            setGenre(newGenre)
            onChangeGenre(newGenre)
          }}
          className="bg-indigo-500 mt-4 rounded-lg py-3 text-xl"
        >
          <RandomGraphic />
          <span>Pick Random</span>
        </button>
      </label>
    </div>
  )
}

export default GenrePicker
