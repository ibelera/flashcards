import { useState } from 'react'
import Navbar from './components/Navbar'
import LearnPage from './pages/LearnPage'
import QuizPage from './pages/QuizPage'
import StatsPage from './pages/StatsPage'
import AddCardPage from './pages/AddCardPage'

type Page = 'learn' | 'quiz' | 'stats' | 'add-card'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('learn')

  const renderPage = () => {
    switch (currentPage) {
      case 'learn':
        return <LearnPage />
      case 'quiz':
        return <QuizPage />
      case 'stats':
        return <StatsPage />
      case 'add-card':
        return <AddCardPage />
      default:
        return <LearnPage />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="container mx-auto px-4 py-8">
        {renderPage()}
      </main>
    </div>
  )
}

export default App 