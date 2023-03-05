import React, { useContext, useEffect } from "react"
import { AppContext } from "./AppContext"
import { useResponseFromPrompt } from "../lib/openai/hooks"

const StepTitle = () => {
  const context = useContext(AppContext)

  useEffect(() => {
    const getTitle = async () => {
      const prompt = `Generate a movie title for ${context.genre} movie based on the logline "${context.logline}"`
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

  return (
    <div className="relative z-10 max-w-3xl text-left mx-auto">
      {context.title && (
        <h2 className="text-5xl pb-12 w-full text-center font-bold">
          {context.title}
        </h2>
      )}
      <div className="text-center pt-4">
        <button
          onClick={() => {
            context.incrementStep()
          }}
          className={`bg-indigo-600 rounded-xl text-white font-medium text-xl sm:text-3xl py-4 pl-12 pr-16 mt-2 mb-4 ${
            context.genre && context.logline
              ? ""
              : "opacity-0 pointer-events-none"
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

export default StepTitle
