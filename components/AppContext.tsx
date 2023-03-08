import React, { createContext, useState } from "react"
import { Characters, AppContextType } from "./Types"

const AppContext = createContext<AppContextType>({
  step: 0,
  setStep: () => {},
  incrementStep: () => {},
  title: "",
  setTitle: () => {},
  titleFont: "",
  setTitleFont: () => {},
  genre: "",
  setGenre: () => {},
  logline: "",
  setLogline: () => {},
  loglineOptions: [],
  setLoglineOptions: () => {},
  acts: [],
  setActs: () => {},
  characters: undefined,
  setCharacters: () => {},
  isSubmitted: false,
  setIsSubmitted: () => {},
  generatedId: undefined,
})

const AppContextProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [state, setState] = useState<{
    step: number
    title: string
    titleFont: string
    genre: string
    logline: string
    loglineOptions: string[]
    characters: Characters | undefined
    acts: string[]
    isSubmitted: boolean
    generatedId: undefined | string
  }>({
    step: 0,
    title: "",
    titleFont: "",
    genre: "",
    logline: "",
    loglineOptions: [],
    characters: undefined,
    acts: [],
    isSubmitted: false,
    generatedId: undefined,
  })

  const setStep = (newStep: number) => {
    setState((prevState) => ({ ...prevState, step: newStep }))
  }

  const incrementStep = () => {
    setState((prevState) => ({ ...prevState, step: prevState.step + 1 }))
  }

  const setTitle = (newTitle: string) => {
    setState((prevState) => ({ ...prevState, title: newTitle }))
  }

  const setTitleFont = (newTitleFont: string) => {
    setState((prevState) => ({ ...prevState, titleFont: newTitleFont }))
  }

  const setGenre = (newGenre: string) => {
    setState((prevState) => ({ ...prevState, genre: newGenre }))
  }

  const setLogline = (newLogline: string) => {
    setState((prevState) => ({ ...prevState, logline: newLogline }))
  }

  const setLoglineOptions = (newLoglineOptions: string[]) => {
    setState((prevState) => ({
      ...prevState,
      loglineOptions: newLoglineOptions,
    }))
  }

  const setCharacters = (newCharacters: Characters) => {
    setState((prevState) => ({
      ...prevState,
      characters: newCharacters,
    }))
  }

  const setActs = (newActs: string[]) => {
    setState((prevState) => ({
      ...prevState,
      acts: newActs,
    }))
  }

  const setIsSubmitted = (isSubmitted: boolean) => {
    setState((prevState) => ({ ...prevState, isSubmitted }))
  }

  const setGeneratedId = (generatedId: string) => {
    setState((prevState) => ({ ...prevState, generatedId }))
  }

  return (
    <AppContext.Provider
      value={{
        step: state.step,
        setStep,
        incrementStep,
        title: state.title,
        setTitle,
        titleFont: state.titleFont,
        setTitleFont,
        genre: state.genre,
        setGenre,
        logline: state.logline,
        setLogline,
        loglineOptions: state.loglineOptions,
        setLoglineOptions,
        characters: state.characters,
        setCharacters,
        acts: state.acts,
        setActs,
        isSubmitted: state.isSubmitted,
        setIsSubmitted,
        generatedId: state.generatedId,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppContextProvider }
