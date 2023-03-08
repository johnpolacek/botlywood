import React, { useContext } from "react"
import { AppContext } from "./AppContext"
import StepCharacter from "./StepCharacter"
import StepCharacterSupporting from "./StepCharacterSupporting"
import LoadingAnimation from "./LoadingAnimation"

const StepCharacters = () => {
  const { characters, setCharacters, incrementStep } = useContext(AppContext)

  let characterStep = <LoadingAnimation />
  if (!characters?.hero) {
    characterStep = (
      <StepCharacter
        heading="Main Character"
        characterType="protagonist"
        onComplete={(hero) => {
          setCharacters({ hero })
        }}
      />
    )
  } else if (!characters?.villain) {
    characterStep = (
      <StepCharacter
        heading="The Antagonist"
        characterType="villain"
        onComplete={(villain) => {
          setCharacters({ ...characters, villain })
        }}
      />
    )
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
