interface NavbarProps {
  currentPage: 'learn' | 'quiz' | 'stats' | 'add-card'
  onPageChange: (page: 'learn' | 'quiz' | 'stats' | 'add-card') => void
}

const Navbar = ({ currentPage, onPageChange }: NavbarProps) => {
  const navItems = [
    { id: 'learn', label: 'Lernen' },
    { id: 'quiz', label: 'Quiz' },
    { id: 'stats', label: 'Statistik' },
    { id: 'add-card', label: 'Karte hinzufügen' }
  ] as const

  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-white text-xl font-bold">Lernkarten</h1>
          </div>
          <div className="flex space-x-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === item.id
                    ? 'bg-blue-700 text-white'
                    : 'text-blue-100 hover:bg-blue-500 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 