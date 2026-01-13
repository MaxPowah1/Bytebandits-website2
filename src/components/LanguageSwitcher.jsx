import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

const LanguageSwitcherContainer = styled.div`
  position: fixed;
  top: 1.5rem;
  right: var(--container-padding);
  z-index: 1000;
  
  @media (max-width: 768px) {
    top: 1rem;
    right: 1rem;
  }
`

const LanguageButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: rgba(45, 45, 45, 0.9);
  color: #f5f5f5;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color var(--transition-fast), border-color var(--transition-fast);
  backdrop-filter: blur(10px);
  
  &:hover {
    background-color: rgba(45, 45, 45, 1);
    border-color: rgba(255, 255, 255, 0.2);
  }
  
  @media (max-width: 768px) {
    padding: 0.4rem 0.75rem;
    font-size: 0.8rem;
  }
`

const LanguageIcon = styled.span`
  font-size: 1rem;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`

const LanguageDropdown = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background-color: rgba(45, 45, 45, 0.98);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  min-width: 150px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  overflow: hidden;
  animation: fadeIn 0.2s ease-out;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

const LanguageOption = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  color: #f5f5f5;
  text-align: left;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color var(--transition-fast);
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  ${props => props.active && `
    background-color: rgba(255, 255, 255, 0.15);
    font-weight: 600;
  `}
`

const languages = [
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' }
]

export default function LanguageSwitcher({ currentLanguage, onLanguageChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const buttonRef = useRef(null)

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleLanguageSelect = (languageCode) => {
    onLanguageChange(languageCode)
    setIsOpen(false)
  }

  return (
    <LanguageSwitcherContainer>
      <LanguageButton ref={buttonRef} onClick={() => setIsOpen(!isOpen)}>
        <LanguageIcon>{currentLang.flag}</LanguageIcon>
        <span>{currentLang.code.toUpperCase()}</span>
      </LanguageButton>
      {isOpen && (
        <LanguageDropdown ref={dropdownRef}>
          {languages.map((language) => (
            <LanguageOption
              key={language.code}
              active={language.code === currentLanguage}
              onClick={() => handleLanguageSelect(language.code)}
            >
              {language.flag} {language.name}
            </LanguageOption>
          ))}
        </LanguageDropdown>
      )}
    </LanguageSwitcherContainer>
  )
}
