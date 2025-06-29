import React, { useState } from 'react'

interface AddCardFormProps {
  onSubmit: (germanWord: string, englishWord: string) => void
  message: string | null
}

const AddCardForm: React.FC<AddCardFormProps> = ({ onSubmit, message }) => {
  const [germanWord, setGermanWord] = useState('')
  const [englishWord, setEnglishWord] = useState('')
  const [formError, setFormError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Clear previous error
    setFormError(null)
    
    if (!germanWord.trim() || !englishWord.trim()) {
      setFormError('Bitte fülle beide Felder aus.')
      return
    }

    onSubmit(germanWord, englishWord)
    
    // Form zurücksetzen
    setGermanWord('')
    setEnglishWord('')
  }

  return (
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
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          Karte speichern
        </button>
      </form>

      {/* Form Error */}
      {formError && (
        <div className="mt-4 p-3 rounded-md bg-red-100 text-red-700">
          {formError}
        </div>
      )}

      {/* Success/Info Message */}
      {message && !formError && (
        <div className={`mt-4 p-3 rounded-md ${
          message.includes('erfolgreich') || message.includes('gelöscht')
            ? 'bg-green-100 text-green-700'
            : 'bg-red-100 text-red-700'
        }`}>
          {message}
        </div>
      )}
    </div>
  )
}

export default AddCardForm 