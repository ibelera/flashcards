import { useState, useEffect } from 'react'
import { Card } from '../types'

const useCustomCards = () => {
  const [customCards, setCustomCards] = useState<Card[]>([])

  // Custom Cards aus localStorage laden
  const loadCustomCards = () => {
    const savedCards = localStorage.getItem('customCards')
    if (savedCards) {
      setCustomCards(JSON.parse(savedCards))
    }
  }

  // Custom Cards in localStorage speichern
  const saveCustomCards = (cards: Card[]) => {
    localStorage.setItem('customCards', JSON.stringify(cards))
    setCustomCards(cards)
  }

  // Neue Karte hinzufügen
  const addCustomCard = (germanWord: string, englishWord: string) => {
    const newCard: Card = {
      id: `custom-${Date.now()}`,
      german: germanWord.trim(),
      english: englishWord.trim(),
      isCustom: true
    }
    const updatedCards = [...customCards, newCard]
    saveCustomCards(updatedCards)
    return newCard
  }

  // Karte löschen
  const deleteCustomCard = (cardId: string) => {
    const updatedCards = customCards.filter(card => card.id !== cardId)
    saveCustomCards(updatedCards)
  }

  // Initial laden
  useEffect(() => {
    loadCustomCards()
  }, [])

  return {
    customCards,
    addCustomCard,
    deleteCustomCard,
    loadCustomCards
  }
}

export default useCustomCards 