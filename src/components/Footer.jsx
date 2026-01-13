import React, { useState } from 'react'
import styled from 'styled-components'
import Impressum from '../pages/Impressum'
import { useI18n } from '../i18n/i18nContext'

const FooterContainer = styled.footer`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #f5f5f5;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: 2rem 0;
  width: 100%;
  z-index: 10;
`

const FooterContent = styled.div`
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: 0 var(--container-padding);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`

const Copyright = styled.p`
  font-size: 0.9rem;
  color: var(--color-text-secondary);
`

const FooterLink = styled.button`
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  transition: opacity var(--transition-fast);
  
  &:hover {
    opacity: 0.7;
  }
`

export default function Footer() {
  const [showImpressum, setShowImpressum] = useState(false)
  const { t } = useI18n()

  return (
    <>
      <FooterContainer>
        <FooterContent>
          <Copyright>{t('contact.copyright', { year: new Date().getFullYear() })}</Copyright>
          <FooterLink onClick={() => setShowImpressum(true)}>
            {t('contact.impressum')}
          </FooterLink>
        </FooterContent>
      </FooterContainer>
      {showImpressum && <Impressum onClose={() => setShowImpressum(false)} />}
    </>
  )
}
