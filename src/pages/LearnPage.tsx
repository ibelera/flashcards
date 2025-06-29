import { useState, useEffect } from 'react'
import Flashcard from '../components/Flashcard'
import { Card } from '../types'
import { germanWords } from '../data/germanWords'

const LearnPage = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [incorrectCards, setIncorrectCards] = useState<Card[]>([])
  const [allCards, setAllCards] = useState<Card[]>([])
  const [isReviewMode, setIsReviewMode] = useState(false)

  // Load cards from localStorage or use default cards
  useEffect(() => {
    const savedCustomCards = localStorage.getItem('customCards')
    const customCards: Card[] = savedCustomCards ? JSON.parse(savedCustomCards) : []
    
    const combinedCards = [...germanWords, ...customCards]
    setAllCards(combinedCards)
  }, [])

  const handleAnswer = (isCorrect: boolean) => {
    const currentCard = allCards[currentCardIndex]
    
    if (!isCorrect) {
      // Add to incorrect cards if not already there
      if (!incorrectCards.find(card => card.id === currentCard.id)) {
        setIncorrectCards(prev => [...prev, currentCard])
      }
    } else if (isReviewMode) {
      // Remove from incorrect cards if answered correctly in review mode
      setIncorrectCards(prev => prev.filter(card => card.id !== currentCard.id))
    }

    // Move to next card
    if (isReviewMode) {
      // In review mode, go to next incorrect card
      const nextIndex = incorrectCards.findIndex(card => card.id !== currentCard.id)
      if (nextIndex >= 0 && nextIndex < incorrectCards.length - 1) {
        const nextCard = incorrectCards[nextIndex + 1]
        const nextCardIndex = allCards.findIndex(card => card.id === nextCard.id)
        setCurrentCardIndex(nextCardIndex)
      } else {
        // End of review session
        setIsReviewMode(false)
        setCurrentCardIndex(0)
      }
    } else {
      // Normal mode, go to next card
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
  const progress = ((currentCardIndex + 1) / allCards.length) * 100

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          {isReviewMode ? 'Wiederholung' : 'Lernen'}
        </h2>
        <div className="flex space-x-4">
          {incorrectCards.length > 0 && !isReviewMode && (
            <button
              onClick={startReviewMode}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Wiederholung ({incorrectCards.length})
            </button>
          )}
          <button
            onClick={resetSession}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Neustart
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>
            {isReviewMode 
              ? `Wiederholung: ${incorrectCards.length} Karten übrig`
              : `Karte ${currentCardIndex + 1} von ${allCards.length}`
            }
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Flashcard */}
      {currentCard ? (
        <Flashcard card={currentCard} onAnswer={handleAnswer} />
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Keine Karten verfügbar</p>
        </div>
      )}

      {/* Session info */}
      <div className="mt-8 text-center">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Session-Info</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Gesamt Karten:</p>
              <p className="font-semibold">{allCards.length}</p>
            </div>
            <div>
              <p className="text-gray-600">Falsch beantwortet:</p>
              <p className="font-semibold text-red-600">{incorrectCards.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LearnPage 