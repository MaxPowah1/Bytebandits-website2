import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import Footer from './components/Footer'
import BurgerMenu from './components/BurgerMenu'
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
  background: transparent;
  overflow: hidden;
  
  @media (max-width: 768px) {
    height: 100dvh;
    min-height: 100dvh;
  }
`

const Frame = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 999;
  opacity: 0.9;

  &::before {
    content: "";
    position: absolute;
    inset: max(12px, 1.6vw);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
  }

  &::after {
    content: "";
    position: absolute;
    inset: max(12px, 1.6vw);
    border-radius: var(--radius-lg);
    box-shadow: inset 0 0 0 1px rgba(201, 162, 39, 0.10);
    mask: radial-gradient(120px 120px at 12% 10%, transparent 0 45%, black 55%),
      radial-gradient(120px 120px at 88% 10%, transparent 0 45%, black 55%),
      radial-gradient(120px 120px at 12% 90%, transparent 0 45%, black 55%),
      radial-gradient(120px 120px at 88% 90%, transparent 0 45%, black 55%);
    opacity: 0.75;
  }

  @media (max-width: 768px) {
    opacity: 0.45;
    &::before,
    &::after {
      inset: 10px;
      border-radius: var(--radius-md);
    }
  }
`

const Main = styled.main`
  flex: 1;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    overscroll-behavior: none;
  }
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
  transition: transform var(--transition-slow);
  transform: translateY(${props => props.offset * 100}%);
  will-change: transform;
  
  @media (max-width: 768px) {
    height: 100dvh;
    min-height: 100dvh;
  }
`

const SlideContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: transparent;
  
  @media (max-width: 768px) {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior: contain;
    background: transparent;
    scroll-behavior: smooth;
    /* helps avoid fixed UI overlap when scrolling inside the slide */
    scroll-padding-top: var(--mobile-content-top);
  }
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
  const sectionRefs = useRef([])
  const [isMobile, setIsMobile] = useState(false)

  // Responsive detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches)
    }
    checkMobile()
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    mediaQuery.addEventListener('change', checkMobile)
    return () => mediaQuery.removeEventListener('change', checkMobile)
  }, [])

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
    let touchStartTime = null

    const handleTouchStart = (e) => {
      if (!isMobile) return
      const touch = e.touches[0]
      touchStartY = touch.clientY
      touchStartTime = Date.now()
    }

    const handleTouchEnd = (e) => {
      if (!isMobile || touchStartY === null) {
        touchStartY = null
        return
      }
      
      if (isScrolling.current) {
        touchStartY = null
        return
      }
      
      const touch = e.changedTouches[0]
      const touchEndY = touch.clientY
      const diff = touchStartY - touchEndY
      const current = currentSectionRef.current
      const swipeThreshold = 50
      const timeDiff = Date.now() - touchStartTime
      const maxSwipeTime = 300 // ms
      
      // Only process if swipe is fast enough and far enough
      if (Math.abs(diff) > swipeThreshold && timeDiff < maxSwipeTime) {
        // Get the current slide's scrollable container
        const currentSlideElement = sectionRefs.current[current]
        if (currentSlideElement) {
          const scrollContainer = currentSlideElement.querySelector('[data-slide-content]') || currentSlideElement
          const scrollTop = scrollContainer.scrollTop
          const scrollHeight = scrollContainer.scrollHeight
          const clientHeight = scrollContainer.clientHeight
          const isAtTop = scrollTop <= 5
          const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5
          
          if (diff > 0) {
            // Swipe up - next section (only if at bottom)
            if (isAtBottom && current < sections.length - 1) {
              isScrolling.current = true
              setCurrentSection(prev => prev + 1)
              setTimeout(() => {
                isScrolling.current = false
              }, 600)
            }
          } else {
            // Swipe down - previous section (only if at top)
            if (isAtTop && current > 0) {
              isScrolling.current = true
              setCurrentSection(prev => prev - 1)
              setTimeout(() => {
                isScrolling.current = false
              }, 600)
            }
          }
        }
      }
      touchStartY = null
      touchStartTime = null
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
  }, [isMobile])

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

  // Art-direction tones for slides
  const slideThemes = ['ink', 'bone', 'ink', 'bone', 'ink']

  return (
    <AppContainer>
      <Frame />
      <BurgerMenu scrollToSection={scrollToSection} />
      <LanguageSwitcher 
        currentLanguage={language} 
        onLanguageChange={setLanguage} 
      />
      <Main ref={mainRef}>
        <Section 
          id="home" 
          offset={0 - currentSection}
          ref={el => sectionRefs.current[0] = el}
        >
          <SlideContent data-slide-content theme={slideThemes[0]}>
            <Home theme={slideThemes[0]} />
          </SlideContent>
        </Section>
        <Section 
          id="services" 
          offset={1 - currentSection}
          ref={el => sectionRefs.current[1] = el}
        >
          <SlideContent data-slide-content theme={slideThemes[1]}>
            <Services theme={slideThemes[1]} />
          </SlideContent>
        </Section>
        <Section 
          id="portfolio" 
          offset={2 - currentSection}
          ref={el => sectionRefs.current[2] = el}
        >
          <SlideContent data-slide-content theme={slideThemes[2]}>
            <Portfolio theme={slideThemes[2]} />
          </SlideContent>
        </Section>
        <Section 
          id="about" 
          offset={3 - currentSection}
          ref={el => sectionRefs.current[3] = el}
        >
          <SlideContent data-slide-content theme={slideThemes[3]}>
            <About theme={slideThemes[3]} />
          </SlideContent>
        </Section>
        <Section 
          id="contact" 
          offset={4 - currentSection}
          ref={el => sectionRefs.current[4] = el}
        >
          <SlideContent data-slide-content theme={slideThemes[4]}>
            <Contact theme={slideThemes[4]} />
          </SlideContent>
        </Section>
      </Main>
      {currentSection === sections.length - 1 && <Footer />}
    </AppContainer>
  )
}
