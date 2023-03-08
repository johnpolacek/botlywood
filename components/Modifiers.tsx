import React, { useContext, useState } from "react"
import { AppContext } from "./AppContext"
import { useStreamingDataFromPrompt } from "../lib/openai/hooks"
import LoadingAnimation from "./LoadingAnimation"

export default function Modifiers() {
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

  const ModifierButton = ({
    children,
    modifier,
  }: {
    children: string
    modifier?: string
  }) => (
    <button
      disabled={isStreaming || !plot}
      onClick={() => {
        modify(modifier || children.toLowerCase())
      }}
      className="transition-all duration-500 rounded-lg py-2 px-4 bg-indigo-800 text-white disabled:bg-gray-600 disabled:opacity-50"
    >
      {children}
    </button>
  )

  return (
    <>
      <div className="flex flex-wrap pt-4 gap-5 justify-center">
        <ModifierButton>Add a Twist</ModifierButton>
        <ModifierButton modifier="spice it up">Spicier</ModifierButton>
        <ModifierButton modifier="make it weirder">Weirder</ModifierButton>
        <ModifierButton modifier="make it funnier">Funnier</ModifierButton>
        <ModifierButton modifier="bigger and bolder">Bigger</ModifierButton>
        <ModifierButton modifier="with smaller stakes">Smaller</ModifierButton>
        <ModifierButton>Darker</ModifierButton>
        <ModifierButton modifier="brighter, happier and more positive">
          Happier
        </ModifierButton>
      </div>
      {isStreaming && (
        <div className="-my-12">
          <LoadingAnimation />
        </div>
      )}
    </>
  )
}
