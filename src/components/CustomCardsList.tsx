import React from 'react'
import { Card } from '../types'

interface CustomCardsListProps {
  customCards: Card[]
  onDeleteCard: (cardId: string) => void
}

const CustomCardsList: React.FC<CustomCardsListProps> = ({ customCards, onDeleteCard }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h3 className="text-xl font-semibold text-gray-800 mb-4">
      Eigene Karten ({customCards.length})
    </h3>

    {customCards.length === 0 ? (
      <p className="text-gray-600 text-center py-8">
        Du hast noch keine eigenen Karten erstellt.
      </p>
    ) : (
      <div className="space-y-3">
        {customCards.map((card) => (
          <div
            key={card.id}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <div className="flex-1">
              <div className="flex items-center space-x-4">
                <div className="text-lg font-semibold text-gray-800">
                  {card.german}
                </div>
                <div className="text-gray-500">→</div>
                <div className="text-lg text-blue-600">
                  {card.english}
                </div>
              </div>
            </div>
            <button
              onClick={() => onDeleteCard(card.id)}
              className="ml-4 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm"
            >
              Löschen
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
)

export default CustomCardsList 