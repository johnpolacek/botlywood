export type Character = {
	name: string
	description: string
	actor?: string
}

export type Characters = {
	hero: Character
	villain: Character
	supporting: Character[]
}

export type AppContextType = {
	step: number
	setStep: (newStep: number) => void
	title: string
	setTitle: (title: string) => void
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
