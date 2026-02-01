import { StrictMode, useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { I18nProvider } from './i18n/i18nContext'
import MobileApp from './mobile/MobileApp.jsx'

function isMobilePath() {
  // Supported:
  // - /m (legacy path; may 404 on static hosting)
  // - /m/<section> (legacy path; may 404 on static hosting)
  // - /#/m (canonical hash path)
  // - /#/m/<section> (canonical hash path)
  const { pathname, hash } = window.location

  if (pathname === '/m' || pathname.startsWith('/m/')) return true
  if (hash === '#/m' || hash.startsWith('#/m/')) return true

  return false
}

function isLikelyMobileDevice() {
  try {
    if (navigator.userAgentData && typeof navigator.userAgentData.mobile === 'boolean') {
      return navigator.userAgentData.mobile
    }
  } catch {
    // ignore
  }

  const hasCoarsePointer = (() => {
    try {
      return window.matchMedia && window.matchMedia('(pointer: coarse)').matches
    } catch {
      return false
    }
  })()
  const hasTouch = (() => {
    try {
      return navigator.maxTouchPoints > 0 || 'ontouchstart' in window
    } catch {
      return false
    }
  })()
  if (hasCoarsePointer && hasTouch) return true

  return /Android|iPhone|iPad|iPod|Windows Phone|Mobi/i.test(navigator.userAgent)
}

function shouldUseMobileExperience() {
  // Prefer viewport breakpoint, but fall back to device hint for browsers that request “desktop site”.
  return window.matchMedia('(max-width: 768px)').matches || isLikelyMobileDevice()
}

function getCurrentSectionFromUrl() {
  const { pathname, hash } = window.location

  // Prefer explicit hash anchors (#home, #portfolio, ...)
  if (hash && hash.startsWith('#') && hash.length > 1) {
    const raw = hash.slice(1)
    if (raw.startsWith('/m/')) return raw.slice('/m/'.length).split('/')[0] || null
    if (raw === '/m') return null
    if (raw.startsWith('/')) return raw.slice(1).split('/')[0] || null
    return raw.split('/')[0] || null
  }

  // Also support /m/<section> deep links
  if (pathname.startsWith('/m/')) {
    return decodeURIComponent(pathname.replace('/m/', '')).split('/')[0] || null
  }

  return null
}

function buildMobileUrl(sectionId) {
  // Canonical mobile URL is hash-based to work on static hosting without rewrites:
  // /#/m/<section>
  return sectionId ? `/#/m/${encodeURIComponent(sectionId)}` : '/#/m'
}

function buildDesktopUrl(sectionId) {
  // Desktop is hash-based sections already.
  return sectionId ? `/#${encodeURIComponent(sectionId)}` : '/'
}

// Avoid initial “scroll lock” flash on mobile-capable devices.
if (isMobilePath() || shouldUseMobileExperience()) {
  document.documentElement.classList.add('bb-mobile')
  document.body.classList.add('bb-mobile')
}

function RootRouter() {
  const [mobile, setMobile] = useState(() => shouldUseMobileExperience() || isMobilePath())

  useEffect(() => {
    const enforceRedirect = () => {
      const wantsMobile = shouldUseMobileExperience()
      const onMobileRoute = isMobilePath()
      if (wantsMobile === onMobileRoute) return

      const section = getCurrentSectionFromUrl()
      const nextUrl = wantsMobile ? buildMobileUrl(section) : buildDesktopUrl(section)
      window.location.replace(nextUrl)
    }

    // Initial redirect (device -> correct site variant)
    enforceRedirect()

    const onChange = () => {
      enforceRedirect()
      setMobile(wantsMobile)
    }

    const mediaQuery = window.matchMedia('(max-width: 768px)')

    mediaQuery.addEventListener('change', onChange)
    window.addEventListener('popstate', onChange)
    window.addEventListener('hashchange', onChange)

    return () => {
      mediaQuery.removeEventListener('change', onChange)
      window.removeEventListener('popstate', onChange)
      window.removeEventListener('hashchange', onChange)
    }
  }, [])

  useEffect(() => {
    const classList = document.documentElement.classList
    const bodyClassList = document.body.classList
    if (mobile) {
      classList.add('bb-mobile')
      bodyClassList.add('bb-mobile')
    } else {
      classList.remove('bb-mobile')
      bodyClassList.remove('bb-mobile')
    }
  }, [mobile])

  const root = useMemo(() => (mobile ? <MobileApp /> : <App />), [mobile])
  return root
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <I18nProvider>
      <RootRouter />
    </I18nProvider>
  </StrictMode>,
)
