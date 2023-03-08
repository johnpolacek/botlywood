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

export type AppContextType = {
  step: number
  setStep: (newStep: number) => void
  incrementStep: () => void
  title: string
  setTitle: (title: string) => void
  titleFont: string
  setTitleFont: (title: string) => void
  genre: string
  setGenre: (genre: string) => void
  logline: string
  setLogline: (logline: string) => void
  loglineOptions: string[]
  setLoglineOptions: (loglineOptions: string[]) => void
  characters?: Characters
  setCharacters: (characters: Characters) => void
  acts: string[]
  setActs: (newActs: string[]) => void
  children?: React.ReactNode
  isSubmitted: boolean
  setIsSubmitted: (isSubmitted: boolean) => void
  generatedId?: string
}

export type TitleSelection = {
  title: string
  font: string
}
