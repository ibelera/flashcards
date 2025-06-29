import { useState, useEffect } from 'react'
import { Card } from '../types'

interface FlashcardProps {
  card: Card
  onAnswer: (isCorrect: boolean) => void
}

const Flashcard = ({ card, onAnswer }: FlashcardProps) => {
  const [isFlipped, setIsFlipped] = useState(false)

  // Reset flip state when card changes
  useEffect(() => {
    setIsFlipped(false)
  }, [card.id])

  const handleFlip = () => {
    if (!isFlipped) {
      setIsFlipped(true)
    }
  }

  const handleAnswer = (isCorrect: boolean) => {
    onAnswer(isCorrect)
  }

  return (
    <div className="max-w-md mx-auto">
      {/* Flashcard Container */}
      <div className="relative w-full h-64">
        {/* Front of card */}
        {!isFlipped && (
          <div 
            className="absolute w-full h-full"
            onClick={handleFlip}
          >
            <div className="w-full h-full bg-white rounded-lg shadow-lg border-2 border-gray-200 flex items-center justify-center p-6 cursor-pointer hover:shadow-xl transition-shadow">
              <h2 className="text-3xl font-bold text-gray-800 text-center">
                {card.german}
              </h2>
            </div>
          </div>
        )}
        
        {/* Back of card */}
        {isFlipped && (
          <div className="absolute w-full h-full">
            <div className="w-full h-full bg-blue-50 rounded-lg shadow-lg border-2 border-blue-200 flex flex-col items-center justify-center p-6">
              <h3 className="text-2xl font-semibold text-blue-800 text-center mb-4">
                {card.english}
              </h3>
              <p className="text-sm text-gray-600 text-center mb-4">
                Wie gut kanntest du dieses Wort?
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Answer buttons - only show when card is flipped */}
      {isFlipped && (
        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={() => handleAnswer(false)}
            className="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors flex items-center space-x-2 shadow-md"
          >
            <span className="text-lg">✗</span>
            <span>Falsch</span>
          </button>
          <button
            onClick={() => handleAnswer(true)}
            className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center space-x-2 shadow-md"
          >
            <span className="text-lg">✓</span>
            <span>Richtig</span>
          </button>
        </div>
      )}

      {/* Instructions */}
      {!isFlipped && (
        <div className="mt-4 text-center">
          <p className="text-gray-600 text-sm">
            Klicke auf die Karte, um sie umzudrehen
          </p>
        </div>
      )}
    </div>
  )
}

export default Flashcard 