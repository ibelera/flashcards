import { useState, useCallback } from 'react'

interface Message {
  text: string
  type: 'success' | 'error'
}

const useMessage = (timeoutMs: number = 3000) => {
  const [message, setMessage] = useState<Message | null>(null)

  const showMessage = useCallback((text: string, type: 'success' | 'error' = 'success') => {
    setMessage({ text, type })
    
    // Automatisch nach timeoutMs entfernen
    setTimeout(() => {
      setMessage(null)
    }, timeoutMs)
  }, [timeoutMs])

  const clearMessage = useCallback(() => {
    setMessage(null)
  }, [])

  return {
    message,
    showMessage,
    clearMessage
  }
}

export default useMessage 