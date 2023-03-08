import React, { useContext, useEffect, useState } from "react"
import { AppContext } from "./AppContext"
import { Character } from "./Types"
import StepCharacter from "./StepCharacter"

const StepCharacterSupporting = () => {
  const { characters, setCharacters, incrementStep } = useContext(AppContext)
  const [supportingCharacters, setSupportingCharacters] = useState<Character[]>(
    []
  )
  const [numCharacters, setNumCharacters] = useState<number | null>(null)

  // require between 3-5 characters
  // useEffect(() => {
  //   setNumCharacters(Math.floor(Math.random() * 3) + 3)
  // }, [])
  useEffect(() => {
    setNumCharacters(2) // use 2 to be cheapers
  }, [])

  const onComplete = (character: Character) => {
    const newSupporting = [...supportingCharacters, character]
    if (newSupporting.length === numCharacters) {
      setCharacters({
        hero: characters?.hero,
        villain: characters?.villain,
        supporting: newSupporting,
      })
    } else {
      setSupportingCharacters(newSupporting)
      incrementStep()
    }
  }

  const heading = `Supporting Character ${
    supportingCharacters.length + 1
  } / ${numCharacters}`

  return (
    <div>
      <StepCharacter
        heading={heading}
        characterType="supporting character"
        onComplete={onComplete}
      />
    </div>
  )
}

export default StepCharacterSupporting
