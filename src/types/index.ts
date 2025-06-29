export interface Card {
  id: string
  german: string
  english: string
  isCustom?: boolean
}

export interface Deck {
  id: string
  name: string
  cards: Card[]
}

export interface Statistics {
  totalCardsStudied: number
  totalCorrectAnswers: number
  totalIncorrectAnswers: number
  customCardsCreated: number
} 