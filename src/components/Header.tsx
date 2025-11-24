import { useState } from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="py-4 px-4 md:px-8 bg-white/95 backdrop-blur-sm shadow-lg border-b border-primary-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
            🍰
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-primary-600">A Confeiteira Próspera</h1>
            <p className="text-xs text-chocolate-500 hidden md:block">por Duda Berger</p>
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li>
              <Link to="/" className="text-chocolate-600 hover:text-accent-600 transition-colors duration-300 font-medium flex items-center space-x-1">
                <span>🏠</span>
                <span>Home</span>
              </Link>
            </li>
            <li>
              <a href="#" className="text-chocolate-600 hover:text-accent-600 transition-colors duration-300 font-medium flex items-center space-x-1">
                <span>👩‍🍳</span>
                <span>Sobre</span>
              </a>
            </li>
            <li>
              <a href="#" className="text-chocolate-600 hover:text-accent-600 transition-colors duration-300 font-medium flex items-center space-x-1">
                <span>🎓</span>
                <span>Cursos</span>
              </a>
            </li>
            <li>
              <Link to="/presets" className="text-chocolate-600 hover:text-accent-600 transition-colors duration-300 font-medium flex items-center space-x-1">
                <span>🎨</span>
                <span>Presets</span>
              </Link>
            </li>
            <li>
              <a href="#" className="bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-full transition-colors duration-300 font-medium flex items-center space-x-1">
                <span>💬</span>
                <span>Contato</span>
              </a>
            </li>
          </ul>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-chocolate-600 hover:text-accent-600 transition-colors duration-300 p-2"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav 
          className="md:hidden mt-4 border-t border-primary-100 pt-4"
          style={{ animation: 'slideDown 0.3s ease-out' }}
        >
          <ul className="flex flex-col space-y-2">
            <li>
              <Link to="/" className="text-chocolate-600 hover:text-accent-600 transition-colors duration-300 block py-3 px-4 rounded-lg hover:bg-accent-50 font-medium flex items-center space-x-2">
                <span>🏠</span>
                <span>Home</span>
              </Link>
            </li>
            <li>
              <a href="#" className="text-chocolate-600 hover:text-accent-600 transition-colors duration-300 block py-3 px-4 rounded-lg hover:bg-accent-50 font-medium flex items-center space-x-2">
                <span>👩‍🍳</span>
                <span>Sobre</span>
              </a>
            </li>
            <li>
              <a href="#" className="text-chocolate-600 hover:text-accent-600 transition-colors duration-300 block py-3 px-4 rounded-lg hover:bg-accent-50 font-medium flex items-center space-x-2">
                <span>🎓</span>
                <span>Cursos</span>
              </a>
            </li>
            <li>
              <Link to="/presets" className="text-chocolate-600 hover:text-accent-600 transition-colors duration-300 block py-3 px-4 rounded-lg hover:bg-accent-50 font-medium flex items-center space-x-2">
                <span>🎨</span>
                <span>Presets</span>
              </Link>
            </li>
            <li>
              <a href="#" className="bg-accent-500 hover:bg-accent-600 text-white py-3 px-4 rounded-lg transition-colors duration-300 font-medium flex items-center space-x-2">
                <span>💬</span>
                <span>Contato</span>
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}

export default Header
