import React, { useContext } from "react"
import { AppContext } from "./AppContext"
import StepCharacter from "./StepCharacter"
import StepCharacterSupporting from "./StepCharacterSupporting"
import LoadingAnimation from "./LoadingAnimation"
import TitleFont from "./TitleFont"
import { getFontClassFromName } from "./util/text"
import FadeIn from "./ui/FadeIn"

const StepCharacters = () => {
  const {
    characters,
    setCharacters,
    incrementStep,
    title,
    titleFont,
    colorScheme,
  } = useContext(AppContext)

  let characterStep = <LoadingAnimation />
  if (!characters?.hero) {
    characterStep = (
      <StepCharacter
        heading="Featuring"
        characterType="protagonist"
        onComplete={(hero) => {
          setCharacters({ hero })
        }}
      />
    )
  } else if (!characters?.villain) {
    characterStep = (
      <StepCharacter
        heading="Also Starring"
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
      <FadeIn>
        <TitleFont
          text={title}
          color={colorScheme?.main || "white"}
          fontClass={getFontClassFromName(titleFont)}
        />
      </FadeIn>
      <div className="pt-16">{characterStep}</div>
    </div>
  )
}

export default StepCharacters
