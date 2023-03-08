import React, { useContext, useEffect } from "react"
import { AppContext } from "./AppContext"
import { useResponseFromPrompt } from "../lib/openai/hooks"

const StepActs = () => {
  const context = useContext(AppContext)

  useEffect(() => {
    getActs()
  }, [])

  const getActs = async () => {
    console.log("getActs")
  }

  useEffect(() => {
    const getTitle = async () => {
      const prompt = `Generate a movie title for ${
        context.genre
      } movie based on this plot "${context.plot}" ${
        context.acts ? "and three acts of " + context.acts.join(", ") : ""
      }`
      const title = await useResponseFromPrompt(prompt)
      if (title) {
        context.setTitle(title.split(":")[0].replace(/"/g, ""))
      } else {
        alert("Sorry there was a problem with the robots.")
      }
    }
    if (!context.title) {
      getTitle()
    }
  }, [context.title])

  const onReroll = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    const prompt = `Generate 3 acts for a ${context.genre} movie based on the plot "${context.plot}". Respond in JSON format as an array of strings`
    const actsString = await useResponseFromPrompt(prompt)

    if (actsString) {
      try {
        const acts = JSON.parse(actsString)
        context.setActs(acts)
      } catch (error) {
        console.error(error)
        alert("Sorry there was a problem with the robots.")
      }
    } else {
      alert("Sorry there was a problem with the robots.")
    }
  }

  const onCompleteStep = () => {
    context.incrementStep()
  }

  return (
    <div className="relative z-10 max-w-3xl text-left mx-auto">
      {context.title && (
        <h2 className="text-5xl pb-12 w-full text-center font-bold">
          {context.title}
        </h2>
      )}
      {context.acts.map((act, i) => (
        <div className="pb-8">
          <div className="text-3xl text-center font-bold pb-2">{`Act ${
            i + 1
          }`}</div>
          <div className="text-lg">{act}</div>
        </div>
      ))}
      {!context.acts && (
        <div className="w-full flex justify-center py-16 relative z-10">
          <img
            width="120"
            height="120"
            src="/loading.svg"
            alt="Loading plots"
          />
        </div>
      )}
      <div className="text-center pt-4">
        <button
          onClick={onCompleteStep}
          className={`bg-indigo-600 rounded-xl text-white font-medium text-xl sm:text-3xl py-4 pl-12 pr-16 mt-2 mb-4 ${
            context.genre && context.plot ? "" : "opacity-0 pointer-events-none"
          }`}
        >
          <span className="inline-block relative">
            Next{" "}
            <span className="font-thin text-4xl absolute -top-2 -right-8 pt-px">
              »
            </span>
          </span>
        </button>
      </div>
    </div>
  )
}

export default StepActs
