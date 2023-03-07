import React, { useContext } from "react"
import { AppContext } from "./AppContext"
import StepCharacterHero from "./StepCharacterHero"
import StepCharacterVillain from "./StepCharacterVillain"
import StepCharacterSupporting from "./StepCharacterSupporting"
import LoadingAnimation from "./LoadingAnimation"

const StepCharacters = () => {
  const { characters, incrementStep } = useContext(AppContext)

  let characterStep = <LoadingAnimation />
  if (!characters?.hero) {
    console.log("yo")
    characterStep = <StepCharacterHero />
  } else if (!characters?.villain) {
    characterStep = <StepCharacterVillain />
  } else if (characters.hero && characters.villain && !characters.supporting) {
    characterStep = <StepCharacterSupporting />
  } else if (characters.hero && characters.villain && characters.supporting) {
    incrementStep()
  }

  return (
    <div className="relative z-10 px-4 md:px-0 max-w-5xl text-left mx-auto w-full min-h-[80vh]">
      {characterStep}
    </div>
  )
}

export default StepCharacters
