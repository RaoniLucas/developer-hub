import { useState } from 'react'
import { ThemeProvider } from './contexts/ThemeContext'
import { Header } from './components/Header/Header'
import { Menu } from './components/Menu/Menu'
import { HeroSection } from './components/Sections/HeroSection'
import './styles.css'

export function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleToggleMenu = () => setIsMenuOpen(prev => !prev)

  return (
    <ThemeProvider>
      <Menu isOpen={isMenuOpen} onToggle={handleToggleMenu} />

      <Header isMenuOpen={isMenuOpen} onToggleMenu={handleToggleMenu} />

      <main>
        <HeroSection />

        <section>
          {/* Apresentação de Projetos — em breve */}
        </section>
      </main>

      <footer />
    </ThemeProvider>
  )
}
