import React, { useContext, useState, useEffect } from "react"
import { AppContext } from "./AppContext"
import {
  useStreamingDataFromPrompt,
  useResponseFromPrompt,
} from "../lib/openai/hooks"
import untruncateJson from "untruncate-json"
import Heading from "./ui/Heading"
import RandomGraphic from "./ui/graphics/Random"
import NextButton from "./ui/NextButton"

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
  const [genreInput, setGenreInput] = useState<string>("")

  const { genre, setGenre, plotOptions, setPlotOptions } =
    useContext(AppContext)

  useEffect(() => {}, [genre])

  const generatePlot = async () => {
    const prompt = `Generate 5 random plot ideas for a ${genre} movie in JSON format as an array of strings`
    setPlotOptions([])

    await useStreamingDataFromPrompt({
      prompt,
      onData: (plotOptionsString) => {
        try {
          const plotOptions = JSON.parse(untruncateJson(plotOptionsString))
          setPlotOptions(plotOptions)
        } catch (error) {
          console.error(error)
        }
      },
      onError: () => {
        console.log("Plot idea generation failed, retry...")
        generatePlot()
      },
    })
  }

  return (
    <div className="sm:mb-4 items-center sm:space-x-3 max-w-lg mx-auto relative z-10">
      <label className="flex flex-col gap-4">
        <Heading>Choose a genre for your movie</Heading>
        <select
          className="text-black rounded-lg text-center py-3 text-xl"
          value={genreInput}
          onChange={(e) => {
            setGenreInput(e.target.value)
          }}
        >
          <option value="">Choose a Genre...</option>
          {genres.map((g) => (
            <option key={g}>{g}</option>
          ))}
        </select>
        <button
          disabled={genre !== "" && plotOptions.length < 5}
          onClick={() => {
            const newGenre = genres[Math.floor(Math.random() * genres.length)]
            setGenreInput(newGenre)
          }}
          className="transition-all duration-500 bg-indigo-500 mt-4 rounded-lg py-3 text-xl disabled:bg-gray-600 disabled:opacity-80"
        >
          <RandomGraphic />
          <span>Go Random</span>
        </button>
        <button
          disabled={genre !== "" && plotOptions.length < 5}
          onClick={() => {
            const hybridGenres = genres
              .sort(() => Math.random() - 0.5)
              .slice(0, 2)
            let hybrid = hybridGenres.join(" ")
            if (hybrid === "War Crime") {
              hybrid = "War Heist Caper"
            }
            setGenreInput(hybrid)
          }}
          className="transition-all duration-500 bg-indigo-700 rounded-lg py-3 text-xl disabled:bg-gray-600 disabled:opacity-80"
        >
          <RandomGraphic />
          <span>Go Hybrid</span>
        </button>
        <button
          disabled={genre !== "" && plotOptions.length < 5}
          onClick={async () => {
            setGenreInput("")
            const newGenre = await useResponseFromPrompt(
              `Respond with a suggestion for an unusual or very niche movie genre. Do not reply with any punctuation, just the suggestion`
            )
            setGenreInput(newGenre.replace(/^\d+\.\s/, ""))
          }}
          className="transition-all duration-500 bg-blue-600 rounded-lg py-3 text-xl disabled:bg-gray-600 disabled:opacity-80"
        >
          <RandomGraphic />
          <span>Go Outside the Box</span>
        </button>
      </label>
      <div className="mt-8 mb-16">
        <label className="w-full pb-2 italic block" htmlFor="genre">
          Or enter your own
        </label>
        <input
          name="genre"
          className="w-full rounded -ml-2 text-black text-xl text-center py-2"
          value={genreInput}
          onChange={(e) => setGenreInput(e.target.value)}
        />
      </div>
      {!genre && (
        <NextButton
          disabled={!genreInput}
          onClick={() => {
            setGenre(genreInput)
          }}
        />
      )}
    </div>
  )
}

export default GenrePicker
