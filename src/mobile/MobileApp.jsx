import React, { useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { useI18n } from '../i18n/i18nContext'

import LanguageSwitcher from '../components/LanguageSwitcher'
import MobileMenu from './components/MobileMenu'

import HomeMobile from './pages/HomeMobile'
import ServicesMobile from './pages/ServicesMobile'
import PortfolioMobile from './pages/PortfolioMobile'
import AboutMobile from './pages/AboutMobile'
import ContactMobile from './pages/ContactMobile'
import ImpressumPage from './pages/ImpressumPage'

const Shell = styled.div`
  min-height: 100dvh;
  width: 100%;
`

const Main = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Section = styled.section`
  width: 100%;
  scroll-margin-top: calc(var(--fixed-ui-top) + 4rem);
`

const BottomBar = styled.footer`
  width: 100%;
  padding: 1.25rem var(--container-padding) calc(1.25rem + var(--safe-bottom));
  color: var(--color-text-tertiary);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;
  text-align: center;

  a {
    color: rgba(201, 162, 39, 0.92);
    letter-spacing: 0.18em;
    text-transform: uppercase;
    font-size: 0.78rem;
  }
`

function getInitialMobileSection() {
  const { pathname, hash } = window.location

  // Canonical: /#/m/<section>
  if (hash === '#/m') return null
  if (hash.startsWith('#/m/')) return decodeURIComponent(hash.slice('#/m/'.length)).split('/')[0]

  // Legacy: /m#section or /m/<section>
  if (pathname === '/m') return hash?.startsWith('#') ? hash.slice(1) : null
  if (pathname.startsWith('/m/')) return decodeURIComponent(pathname.replace('/m/', '')).split('/')[0]

  return null
}

export default function MobileApp() {
  const { language, setLanguage, t } = useI18n()

  useEffect(() => {
    // Enable “normal scrolling” mode for the /m path, even on desktop widths.
    document.documentElement.classList.add('bb-mobile')
    document.body.classList.add('bb-mobile')
    return () => {
      document.documentElement.classList.remove('bb-mobile')
      document.body.classList.remove('bb-mobile')
    }
  }, [])

  const scrollToSection = useCallback((sectionId, { behavior = 'smooth', history = 'push' } = {}) => {
    const el = document.getElementById(sectionId)
    if (!el) return

    try {
      el.scrollIntoView({ behavior, block: 'start' })
    } catch {
      // Older browsers: ignore smooth scroll options.
      el.scrollIntoView()
    }

    const nextHash = `#/m/${sectionId}`
    if (window.location.hash !== nextHash) {
      const method = history === 'replace' ? 'replaceState' : 'pushState'
      window.history[method](null, '', nextHash)
    }
  }, [])

  const scrollToSectionNoHistory = useCallback((sectionId, { behavior = 'auto' } = {}) => {
    const el = document.getElementById(sectionId)
    if (!el) return
    try {
      el.scrollIntoView({ behavior, block: 'start' })
    } catch {
      el.scrollIntoView()
    }
  }, [])

  useEffect(() => {
    // Keep CTA buttons (and any legacy calls) working.
    window.scrollToSection = (sectionId) => scrollToSection(sectionId, { behavior: 'smooth', history: 'push' })
    return () => {
      delete window.scrollToSection
    }
  }, [scrollToSection])

  useEffect(() => {
    const initial = getInitialMobileSection()
    if (!initial) return

    // Wait one frame so layout is ready.
    requestAnimationFrame(() => scrollToSection(initial, { behavior: 'auto', history: 'replace' }))
  }, [scrollToSection])

  useEffect(() => {
    const onNav = () => {
      const section = getInitialMobileSection()
      if (!section) return
      scrollToSectionNoHistory(section, { behavior: 'auto' })
    }

    window.addEventListener('hashchange', onNav)
    window.addEventListener('popstate', onNav)
    return () => {
      window.removeEventListener('hashchange', onNav)
      window.removeEventListener('popstate', onNav)
    }
  }, [scrollToSectionNoHistory])

  return (
    <Shell>
      <MobileMenu scrollToSection={scrollToSection} />
      <LanguageSwitcher currentLanguage={language} onLanguageChange={setLanguage} />
      <Main>
        <Section id="home">
          <HomeMobile />
        </Section>
        <Section id="services">
          <ServicesMobile />
        </Section>
        <Section id="portfolio">
          <PortfolioMobile />
        </Section>
        <Section id="about">
          <AboutMobile />
        </Section>
        <Section id="contact">
          <ContactMobile />
        </Section>
        <Section id="impressum">
          <ImpressumPage />
        </Section>
      </Main>
      <BottomBar>
        <div>{t('contact.copyright', { year: new Date().getFullYear() })}</div>
        <a
          href="/#/m/home"
          onClick={(e) => {
            e.preventDefault()
            scrollToSection('home')
          }}
        >
          Back to top
        </a>
      </BottomBar>
    </Shell>
  )
}

