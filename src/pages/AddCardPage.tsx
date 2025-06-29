import { useState, useEffect } from 'react'
import { Card } from '../types'

const AddCardPage = () => {
  const [germanWord, setGermanWord] = useState('')
  const [englishWord, setEnglishWord] = useState('')
  const [customCards, setCustomCards] = useState<Card[]>([])
  const [message, setMessage] = useState('')

  // Load existing custom cards
  useEffect(() => {
    const savedCards = localStorage.getItem('customCards')
    if (savedCards) {
      setCustomCards(JSON.parse(savedCards))
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!germanWord.trim() || !englishWord.trim()) {
      setMessage('Bitte fülle beide Felder aus.')
      return
    }

    const newCard: Card = {
      id: `custom-${Date.now()}`,
      german: germanWord.trim(),
      english: englishWord.trim(),
      isCustom: true
    }

    const updatedCards = [...customCards, newCard]
    setCustomCards(updatedCards)
    localStorage.setItem('customCards', JSON.stringify(updatedCards))

    // Reset form
    setGermanWord('')
    setEnglishWord('')
    setMessage('Karte erfolgreich hinzugefügt!')

    // Clear message after 3 seconds
    setTimeout(() => setMessage(''), 3000)
  }

  const deleteCard = (cardId: string) => {
    const updatedCards = customCards.filter(card => card.id !== cardId)
    setCustomCards(updatedCards)
    localStorage.setItem('customCards', JSON.stringify(updatedCards))
    setMessage('Karte gelöscht!')
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Karte hinzufügen</h2>

      {/* Add Card Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Neue Karte erstellen</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="germanWord" className="block text-sm font-medium text-gray-700 mb-2">
              Deutsches Wort
            </label>
            <input
              type="text"
              id="germanWord"
              value={germanWord}
              onChange={(e) => setGermanWord(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="z.B. Haus"
              required
            />
          </div>

          <div>
            <label htmlFor="englishWord" className="block text-sm font-medium text-gray-700 mb-2">
              Englische Übersetzung
            </label>
            <input
              type="text"
              id="englishWord"
              value={englishWord}
              onChange={(e) => setEnglishWord(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="z.B. house"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Karte speichern
          </button>
        </form>

        {/* Message */}
        {message && (
          <div className={`mt-4 p-3 rounded-md ${
            message.includes('erfolgreich') || message.includes('gelöscht')
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}>
            {message}
          </div>
        )}
      </div>

      {/* Custom Cards List */}
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
                  onClick={() => deleteCard(card.id)}
                  className="ml-4 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm"
                >
                  Löschen
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AddCardPage 