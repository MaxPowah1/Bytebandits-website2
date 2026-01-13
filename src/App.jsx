import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import Footer from './components/Footer'
import LanguageSwitcher from './components/LanguageSwitcher'
import Home from './pages/Home'
import Services from './pages/Services'
import Portfolio from './pages/Portfolio'
import About from './pages/About'
import Contact from './pages/Contact'
import { useI18n } from './i18n/i18nContext'

const AppContainer = styled.div`
  min-height: 100vh;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--color-bg-primary);
  overflow: hidden;
`

const Main = styled.main`
  flex: 1;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`

const Section = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: stretch;
  padding: 0;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(${props => props.offset * 100}%);
  will-change: transform;
`

const sections = ['home', 'services', 'portfolio', 'about', 'contact']

export default function App() {
  // Initialize state from URL hash if present
  const getInitialSection = () => {
    const hash = window.location.hash.slice(1)
    const index = sections.indexOf(hash)
    return index !== -1 ? index : 0
  }

  const [currentSection, setCurrentSection] = useState(getInitialSection)
  const { language, setLanguage } = useI18n()
  const mainRef = useRef(null)
  const isScrolling = useRef(false)
  const currentSectionRef = useRef(0)
  const isInitialMount = useRef(true)
  const isHashChange = useRef(false)

  // Keep ref in sync with state
  useEffect(() => {
    currentSectionRef.current = currentSection
  }, [currentSection])

  // Reset scrolling flag on mount
  useEffect(() => {
    isScrolling.current = false
    isInitialMount.current = false
  }, [])

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault()
      
      if (isScrolling.current) return
      
      const delta = e.deltaY
      const current = currentSectionRef.current
      
      if (delta > 0) {
        // Scroll down - next section
        if (current < sections.length - 1) {
          isScrolling.current = true
          setCurrentSection(prev => prev + 1)
          setTimeout(() => {
            isScrolling.current = false
          }, 600)
        }
      } else if (delta < 0) {
        // Scroll up - previous section
        if (current > 0) {
          isScrolling.current = true
          setCurrentSection(prev => prev - 1)
          setTimeout(() => {
            isScrolling.current = false
          }, 600)
        }
      }
    }

    const handleKeyDown = (e) => {
      if (isScrolling.current) return
      
      const current = currentSectionRef.current
      
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault()
        if (current < sections.length - 1) {
          isScrolling.current = true
          setCurrentSection(prev => prev + 1)
          setTimeout(() => {
            isScrolling.current = false
          }, 600)
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        if (current > 0) {
          isScrolling.current = true
          setCurrentSection(prev => prev - 1)
          setTimeout(() => {
            isScrolling.current = false
          }, 600)
        }
      }
    }

    let touchStartY = null

    const handleTouchStart = (e) => {
      const touch = e.touches[0]
      touchStartY = touch.clientY
    }

    const handleTouchEnd = (e) => {
      if (touchStartY === null) return
      
      if (isScrolling.current) return
      
      const touch = e.changedTouches[0]
      const touchEndY = touch.clientY
      const diff = touchStartY - touchEndY
      const current = currentSectionRef.current
      
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          // Swipe up - next section
          if (current < sections.length - 1) {
            isScrolling.current = true
            setCurrentSection(prev => prev + 1)
            setTimeout(() => {
              isScrolling.current = false
            }, 600)
          }
        } else {
          // Swipe down - previous section
          if (current > 0) {
            isScrolling.current = true
            setCurrentSection(prev => prev - 1)
            setTimeout(() => {
              isScrolling.current = false
            }, 600)
          }
        }
      }
      touchStartY = null
    }

    const mainElement = mainRef.current
    if (mainElement) {
      mainElement.addEventListener('wheel', handleWheel, { passive: false })
      window.addEventListener('keydown', handleKeyDown)
      mainElement.addEventListener('touchstart', handleTouchStart, { passive: true })
      mainElement.addEventListener('touchend', handleTouchEnd, { passive: true })
    }

    return () => {
      if (mainElement) {
        mainElement.removeEventListener('wheel', handleWheel)
        window.removeEventListener('keydown', handleKeyDown)
        mainElement.removeEventListener('touchstart', handleTouchStart)
        mainElement.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [])

  // Update URL hash when section changes (but not on initial mount or hash changes)
  useEffect(() => {
    // Skip hash update on initial mount or when hash change triggered the state update
    if (isInitialMount.current || isHashChange.current) {
      isHashChange.current = false
      return
    }

    const newHash = `#${sections[currentSection]}`
    if (window.location.hash !== newHash) {
      window.history.replaceState(null, '', newHash)
    }
  }, [currentSection])

  // Handle hash changes from browser navigation (back/forward buttons, direct URL)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1)
      const index = sections.indexOf(hash)
      if (index !== -1 && index !== currentSectionRef.current) {
        isHashChange.current = true
        setCurrentSection(index)
        isScrolling.current = false
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Update header navigation
  const scrollToSection = (sectionId) => {
    const index = sections.indexOf(sectionId)
    if (index !== -1 && !isScrolling.current) {
      isScrolling.current = true
      setCurrentSection(index)
      setTimeout(() => {
        isScrolling.current = false
      }, 600)
    }
  }

  // Expose scrollToSection to window for page components
  useEffect(() => {
    window.scrollToSection = scrollToSection
    return () => {
      delete window.scrollToSection
    }
  }, [scrollToSection])

  return (
    <AppContainer>
      <LanguageSwitcher 
        currentLanguage={language} 
        onLanguageChange={setLanguage} 
      />
      <Main ref={mainRef}>
        <Section id="home" offset={0 - currentSection}>
          <Home />
        </Section>
        <Section id="services" offset={1 - currentSection}>
          <Services />
        </Section>
        <Section id="portfolio" offset={2 - currentSection}>
          <Portfolio />
        </Section>
        <Section id="about" offset={3 - currentSection}>
          <About />
        </Section>
        <Section id="contact" offset={4 - currentSection}>
          <Contact />
        </Section>
      </Main>
      {currentSection === sections.length - 1 && <Footer />}
    </AppContainer>
  )
}
