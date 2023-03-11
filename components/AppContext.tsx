import React, { createContext, useState, useEffect } from "react"
import { Characters, AppContextType, ColorScheme } from "./Types"

const DEFAULT_STATE = {
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
}

const AppContext = createContext<AppContextType>({
  ...DEFAULT_STATE,
  setStep: () => {},
  incrementStep: () => {},
  setTitle: () => {},
  setTitleFont: () => {},
  setColorScheme: () => {},
  setGenre: () => {},
  setPlot: () => {},
  setPlotOptions: () => {},
  setActs: () => {},
  setCharacters: () => {},
  setIsSubmitted: () => {},
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
  }>(() => {
    // Use localStorage value if available, otherwise use default values
    const localStorageValue =
      typeof window !== "undefined" ? localStorage.getItem("appState") : null
    let restoreAppState = {}
    if (localStorageValue) {
      try {
        restoreAppState = JSON.parse(localStorageValue)
      } catch (error) {
        // swallow error - could be malformed data if out-of-date schema
      }
    }
    return { ...DEFAULT_STATE, ...restoreAppState }
  })

  useEffect(() => {
    // Store state in localStorage whenever it changes
    if (typeof window !== "undefined") {
      localStorage.setItem("appState", JSON.stringify(state))
    }
  }, [state])

  useEffect(() => {
    // Store state in localStorage whenever it changes
    if (typeof window !== "undefined") {
      localStorage.setItem("appState", JSON.stringify(state))
    }
  }, [state])

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
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppContextProvider }
