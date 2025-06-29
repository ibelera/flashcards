import React from 'react'

interface SessionInfoProps {
  allCardsLength: number
  incorrectCardsLength: number
}

const SessionInfo: React.FC<SessionInfoProps> = ({ allCardsLength, incorrectCardsLength }) => (
  <div className="mt-8 text-center">
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Session-Info</h3>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-600">Gesamt Karten:</p>
          <p className="font-semibold">{allCardsLength}</p>
        </div>
        <div>
          <p className="text-gray-600">Falsch beantwortet:</p>
          <p className="font-semibold text-red-600">{incorrectCardsLength}</p>
        </div>
      </div>
    </div>
  </div>
)

export default SessionInfo 