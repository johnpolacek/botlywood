import React, { useContext } from "react"
import { AppContext } from "./AppContext"
import { useStreamingDataFromPrompt } from "../lib/openai/hooks"

export default function Modifiers() {
  const { genre, logline, setLogline } = useContext(AppContext)

  const modify = (modifier: string) => {
    const prompt = `Rewrite a plot idea for a ${genre} movie that has a very similar plot as "${logline}" but ${modifier}`
    useStreamingDataFromPrompt(prompt, (newLogline) => {
      setLogline(newLogline)
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
      onClick={() => {
        modify(modifier || children.toLowerCase())
      }}
      className="rounded-lg py-2 px-4 bg-indigo-800 text-white"
    >
      {children}
    </button>
  )

  return (
    <div className="flex flex-wrap pt-4 gap-5 justify-center">
      <ModifierButton>Spice It Up</ModifierButton>
      <ModifierButton>Make It Weird</ModifierButton>
      <ModifierButton>Add a Twist</ModifierButton>
      <ModifierButton modifier="bigger and bolder">Bigger</ModifierButton>
      <ModifierButton modifier="with smaller stakes">Smaller</ModifierButton>
      <ModifierButton>Darker</ModifierButton>
      <ModifierButton modifier="brighter and more positive">
        Bigger
      </ModifierButton>
    </div>
  )
}
