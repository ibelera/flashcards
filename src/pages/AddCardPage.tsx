import React from 'react'
import useCustomCards from '../hooks/useCustomCards'
import useMessage from '../hooks/useMessage'
import AddCardForm from '../components/AddCardForm'
import CustomCardsList from '../components/CustomCardsList'

const AddCardPage = () => {
  const { customCards, addCustomCard, deleteCustomCard } = useCustomCards()
  const { message, showMessage } = useMessage()

  const handleSubmit = (germanWord: string, englishWord: string) => {
    addCustomCard(germanWord, englishWord)
    showMessage('Karte erfolgreich hinzugefügt!', 'success')
  }

  const handleDeleteCard = (cardId: string) => {
    deleteCustomCard(cardId)
    showMessage('Karte gelöscht!', 'success')
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Karte hinzufügen</h2>

      {/* Add Card Form */}
      <AddCardForm 
        onSubmit={handleSubmit}
        message={message?.text || null}
      />

      {/* Custom Cards List */}
      <CustomCardsList 
        customCards={customCards}
        onDeleteCard={handleDeleteCard}
      />
    </div>
  )
}

export default AddCardPage 