import React, { useState } from 'react'
import styled from 'styled-components'
import Impressum from '../pages/Impressum'
import { useI18n } from '../i18n/i18nContext'

const FooterContainer = styled.footer`
  position: fixed;
  left: 50%;
  bottom: 22px;
  transform: translateX(-50%);
  width: min(860px, calc(100% - (2 * var(--container-padding))));
  z-index: 1002;
  border-radius: 999px;
  border: 1px solid rgba(247, 242, 232, 0.16);
  background: rgba(11, 13, 18, 0.62);
  backdrop-filter: blur(14px);
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.25);

  @media (max-width: 768px) {
    bottom: 14px;
    border-radius: 18px;
  }
`

const FooterContent = styled.div`
  padding: 0.85rem 1.1rem;
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
  color: rgba(247, 242, 232, 0.70);
  letter-spacing: 0.02em;
`

const FooterLink = styled.button`
  font-size: 0.78rem;
  color: rgba(201, 162, 39, 0.92);
  letter-spacing: 0.22em;
  text-transform: uppercase;
  transition: opacity var(--transition-fast), transform var(--transition-fast);
  
  &:hover {
    opacity: 1;
    transform: translateY(-1px);
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
