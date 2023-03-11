import React, { useContext, useEffect, useState } from "react"
import { AppContext } from "./AppContext"
import { Character } from "./Types"
import StepCharacter from "./StepCharacter"

const StepCharacterSupporting = () => {
  const { characters, setCharacters, incrementStep } = useContext(AppContext)
  const [supportingCharacters, setSupportingCharacters] = useState<Character[]>(
    []
  )

  const numCharacters = 3

  const onComplete = (character: Character) => {
    const newSupporting = [...supportingCharacters, character]
    if (newSupporting.length === numCharacters) {
      setCharacters({
        hero: characters?.hero,
        villain: characters?.villain,
        supporting: newSupporting,
      })
      incrementStep()
    } else {
      setSupportingCharacters(newSupporting)
    }
  }

  return (
    <div>
      <StepCharacter
        heading={
          "Supporting Character " +
          (supportingCharacters.length + 1) +
          " / " +
          numCharacters
        }
        characterType="supporting character"
        onComplete={onComplete}
      />
    </div>
  )
}

export default StepCharacterSupporting
