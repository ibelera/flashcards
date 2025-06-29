import React from 'react'

interface ProgressBarProps {
  isReviewMode: boolean
  currentCardIndex: number
  allCardsLength: number
  incorrectCardsLength: number
  progress: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  isReviewMode,
  currentCardIndex,
  allCardsLength,
  incorrectCardsLength,
  progress
}) => (
  <div className="mb-6">
    <div className="flex justify-between text-sm text-gray-600 mb-2">
      <span>
        {isReviewMode
          ? `Wiederholung: ${incorrectCardsLength} Karten übrig`
          : `Karte ${currentCardIndex + 1} von ${allCardsLength}`}
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
)

export default ProgressBar 