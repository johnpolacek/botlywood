export type Character = {
  name: string
  description: string
  actor?: string
  image?: string
}

export type Characters = {
  hero?: Character
  villain?: Character
  supporting?: Character[]
}

export type ColorScheme = {
  main: string
}

export type AppContextType = {
  step: number
  setStep: (newStep: number) => void
  incrementStep: () => void
  title: string
  setTitle: (title: string) => void
  titleFont: string
  setTitleFont: (title: string) => void
  colorScheme: ColorScheme | null
  setColorScheme: (colorScheme: ColorScheme) => void
  genre: string
  setGenre: (genre: string) => void
  plot: string
  setPlot: (plot: string) => void
  plotOptions: string[]
  setPlotOptions: (plotOptions: string[]) => void
  characters?: Characters
  setCharacters: (characters: Characters) => void
  acts: string[]
  setActs: (newActs: string[]) => void
  children?: React.ReactNode
  isSubmitted: boolean
  setIsSubmitted: (isSubmitted: boolean) => void
}

export type TitleSelection = {
  title: string
  font: string
  color: string
}
