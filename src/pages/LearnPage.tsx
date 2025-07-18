import Flashcard from '../components/Flashcard'
import useCards from '../hooks/useCards'
import ProgressBar from '../components/ProgressBar'
import SessionInfo from '../components/SessionInfo'

const LearnPage = () => {
  const {
    currentCard,
    currentCardIndex,
    allCards,
    incorrectCards,
    isReviewMode,
    progress,
    handleAnswer,
    startReviewMode,
    resetSession
  } = useCards()

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
      <ProgressBar 
        isReviewMode={isReviewMode}
        currentCardIndex={currentCardIndex}
        allCardsLength={allCards.length}
        incorrectCardsLength={incorrectCards.length}
        progress={progress}
      />

      {/* Flashcard */}
      {currentCard ? (
        <Flashcard card={currentCard} onAnswer={handleAnswer} />
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Keine Karten verfügbar</p>
        </div>
      )}

      {/* Session info */}
      <SessionInfo allCardsLength={allCards.length} incorrectCardsLength={incorrectCards.length} />
    </div>
  )
}

export default LearnPage 