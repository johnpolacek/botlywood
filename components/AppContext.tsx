import React, { createContext, useState } from "react"
import { Characters, AppContextType, ColorScheme } from "./Types"

const AppContext = createContext<AppContextType>({
  step: 0,
  setStep: () => {},
  incrementStep: () => {},
  title: "",
  setTitle: () => {},
  titleFont: "",
  setTitleFont: () => {},
  colorScheme: null,
  setColorScheme: () => {},
  genre: "",
  setGenre: () => {},
  plot: "",
  setPlot: () => {},
  plotOptions: [],
  setPlotOptions: () => {},
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
    colorScheme: ColorScheme | null
    genre: string
    plot: string
    plotOptions: string[]
    characters: Characters | undefined
    acts: string[]
    isSubmitted: boolean
    generatedId: undefined | string
  }>({
    step: 0,
    title: "",
    titleFont: "",
    colorScheme: null,
    genre: "",
    plot: "",
    plotOptions: [],
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

  const setColorScheme = (newColorScheme: ColorScheme) => {
    setState((prevState) => ({ ...prevState, colorScheme: newColorScheme }))
  }

  const setGenre = (newGenre: string) => {
    setState((prevState) => ({ ...prevState, genre: newGenre }))
  }

  const setPlot = (newPlot: string) => {
    setState((prevState) => ({ ...prevState, plot: newPlot }))
  }

  const setPlotOptions = (newPlotOptions: string[]) => {
    setState((prevState) => ({
      ...prevState,
      plotOptions: newPlotOptions,
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
        colorScheme: state.colorScheme,
        setColorScheme,
        genre: state.genre,
        setGenre,
        plot: state.plot,
        setPlot,
        plotOptions: state.plotOptions,
        setPlotOptions,
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
