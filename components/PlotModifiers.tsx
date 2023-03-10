import React, { useContext, useState } from "react"
import { AppContext } from "./AppContext"
import { useStreamingDataFromPrompt } from "../lib/openai/hooks"
import Modifiers from "./Modifiers"

export default function PlotModifiers() {
  const { genre, plot, setPlot } = useContext(AppContext)
  const [isStreaming, setIsStreaming] = useState<boolean>(false)

  const modify = (modifier: string) => {
    setIsStreaming(true)
    const prompt = `Rewrite plot idea for a ${genre} movie that has a very similar plot as "${plot}" but ${modifier}. Make the response be three sentences or less.`
    useStreamingDataFromPrompt({
      prompt,
      onData: (newPlot) => {
        setPlot(newPlot)
      },
      onDone: () => {
        setIsStreaming(false)
      },
    })
  }

  const modifiers = [
    { label: "Add a Twist" },
    { label: "Spicier", modifier: "spice it up" },
    { label: "Weirder", modifier: "make it weirder" },
    { label: "Funnier", modifier: "make it funnier" },
    { label: "Bigger", modifier: "bigger and bolder" },
    { label: "Smaller", modifier: "with smaller stakes" },
    { label: "Darker" },
    { label: "Happier", modifier: "brighter, happier and more positive" },
  ]

  return (
    <Modifiers
      modifiers={modifiers}
      disabled={isStreaming || !plot}
      onModify={modify}
      isLoading={isStreaming}
    />
  )
}
