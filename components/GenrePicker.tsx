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
import { GENRES } from "./util/constants"
import { formatTitle } from "./util/text"
import LoadingAnimation from "./LoadingAnimation"

const GenrePicker: React.FC = () => {
  const [genreInput, setGenreInput] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const { genre, setGenre, plotOptions, setPlotOptions } =
    useContext(AppContext)

  useEffect(() => {}, [genre])

  const generatePlot = async () => {
    const prompt = `Generate 5 random plot ideas for a ${genreInput} movie in JSON format as an array of strings`
    console.log(prompt)
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
    <div
      className={`sm:mb-4 items-center sm:space-x-3 max-w-lg mx-auto relative z-10 ${
        genre && "hidden"
      }`}
    >
      <div className="flex flex-col gap-4 px-2">
        <Heading>Choose a genre for your movie</Heading>
        <select
          className="text-black rounded-lg text-center py-3 text-xl"
          value={genreInput}
          onChange={(e) => {
            setGenreInput(e.target.value)
          }}
        >
          <option value="">Choose a Genre...</option>
          {GENRES.map((g) => (
            <option key={g}>{g}</option>
          ))}
        </select>
        <button
          disabled={genre !== "" && plotOptions.length < 5}
          onClick={() => {
            const newGenre = GENRES[Math.floor(Math.random() * GENRES.length)]
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
            const hybridGenres = GENRES.sort(() => Math.random() - 0.5).slice(
              0,
              2
            )
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
            setLoading(true)
            setGenreInput("")
            const newGenre = await useResponseFromPrompt(
              `Respond with a suggestion for an unusual or very niche movie genre in 3 words or less. Do not reply with any punctuation, just the suggestion`
            )
            setLoading(false)
            console.log({ newGenre })
            setGenreInput(formatTitle(newGenre.replace(/^\d+\.\s/, "")))
          }}
          className="transition-all duration-500 bg-blue-600 rounded-lg py-3 text-xl disabled:bg-gray-600 disabled:opacity-80"
        >
          <RandomGraphic />
          <span>Go Outside the Box</span>
        </button>
      </div>
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
      {loading && (
        <div className="-mt-[152px] -mb-24 scale-50">
          <LoadingAnimation />
        </div>
      )}
      {!genre && (
        <NextButton
          disabled={!genreInput}
          onClick={() => {
            setGenre(genreInput)
            generatePlot()
          }}
        />
      )}
    </div>
  )
}

export default GenrePicker
