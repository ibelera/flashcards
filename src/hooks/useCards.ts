import { useState, useEffect } from 'react'
import { Card } from '../types'
import { germanWords } from '../data/germanWords'

const useCards = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [incorrectCards, setIncorrectCards] = useState<Card[]>([])
  const [allCards, setAllCards] = useState<Card[]>([])
  const [isReviewMode, setIsReviewMode] = useState(false)

  // Karten aus localStorage laden
  const loadCards = () => {
    const savedCustomCards = localStorage.getItem('customCards')
    const customCards: Card[] = savedCustomCards ? JSON.parse(savedCustomCards) : []
    setAllCards([...germanWords, ...customCards])
  }

  useEffect(() => {
    loadCards()
  }, [])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        loadCards()
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  const handleAnswer = (isCorrect: boolean) => {
    const currentCard = allCards[currentCardIndex]
    if (!isCorrect) {
      if (!incorrectCards.find(card => card.id === currentCard.id)) {
        setIncorrectCards(prev => [...prev, currentCard])
      }
    } else if (isReviewMode) {
      setIncorrectCards(prev => prev.filter(card => card.id !== currentCard.id))
    }
    if (isReviewMode) {
      const nextIndex = incorrectCards.findIndex(card => card.id !== currentCard.id)
      if (nextIndex >= 0 && nextIndex < incorrectCards.length - 1) {
        const nextCard = incorrectCards[nextIndex + 1]
        const nextCardIndex = allCards.findIndex(card => card.id === nextCard.id)
        setCurrentCardIndex(nextCardIndex)
      } else {
        setIsReviewMode(false)
        setCurrentCardIndex(0)
      }
    } else {
      setCurrentCardIndex(prev => (prev + 1) % allCards.length)
    }
  }

  const startReviewMode = () => {
    if (incorrectCards.length > 0) {
      setIsReviewMode(true)
      const firstIncorrectCard = incorrectCards[0]
      const firstIncorrectIndex = allCards.findIndex(card => card.id === firstIncorrectCard.id)
      setCurrentCardIndex(firstIncorrectIndex)
    }
  }

  const resetSession = () => {
    setCurrentCardIndex(0)
    setIsReviewMode(false)
  }

  const currentCard = allCards[currentCardIndex]
  const progress = allCards.length > 0 ? ((currentCardIndex + 1) / allCards.length) * 100 : 0

  return {
    currentCard,
    currentCardIndex,
    allCards,
    incorrectCards,
    isReviewMode,
    progress,
    handleAnswer,
    startReviewMode,
    resetSession
  }
}

export default useCards; 