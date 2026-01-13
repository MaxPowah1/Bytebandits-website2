import React, { createContext, useContext, useState, useEffect } from 'react'
import { translations } from './translations'

const I18nContext = createContext()

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}

export function I18nProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    // Try to get language from localStorage, otherwise default to 'de'
    const savedLanguage = localStorage.getItem('bytebandits_language')
    return savedLanguage || 'de'
  })

  useEffect(() => {
    // Save language preference to localStorage
    localStorage.setItem('bytebandits_language', language)
  }, [language])

  const t = (key, params = {}) => {
    const keys = key.split('.')
    let value = translations[language]

    for (const k of keys) {
      if (value && value[k]) {
        value = value[k]
      } else {
        // Fallback to German if translation is missing
        value = translations['de']
        for (const fallbackKey of keys) {
          if (value && value[fallbackKey]) {
            value = value[fallbackKey]
          } else {
            return key
          }
        }
        break
      }
    }

    // Replace placeholders like {year}
    if (typeof value === 'string') {
      return value.replace(/\{(\w+)\}/g, (match, key) => {
        return params[key] !== undefined ? params[key] : match
      })
    }

    return value
  }

  const value = {
    language,
    setLanguage,
    t,
    translations: translations[language]
  }

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  )
}
