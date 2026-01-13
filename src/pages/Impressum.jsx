import React, { useState } from 'react'
import styled from 'styled-components'

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`

const Modal = styled.div`
  position: relative;
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  padding: 3rem 2.5rem 2.5rem;
  overflow-y: auto;
  
  @media (max-width: 768px) {
    padding: 2rem 1.5rem 1.5rem;
    max-height: 85vh;
  }
`

const CloseButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);
  font-size: 1.5rem;
  line-height: 1;
  transition: color var(--transition-fast);
  cursor: pointer;
  
  &:hover {
    color: var(--color-text-primary);
  }
  
  @media (max-width: 768px) {
    top: 1rem;
    right: 1rem;
  }
`

const Title = styled.h2`
  margin-bottom: 2rem;
  color: var(--color-text-primary);
  font-size: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
`

const Content = styled.div`
  color: var(--color-text-secondary);
  line-height: 1.8;
  
  p {
    margin-bottom: 1.5rem;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  strong {
    color: var(--color-text-primary);
    font-weight: 600;
  }
`

const EmailButton = styled.button`
  display: inline-block;
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  color: var(--color-text-primary);
  font-size: 0.9rem;
  font-weight: 500;
  border-radius: 4px;
  transition: background-color var(--transition-fast), border-color var(--transition-fast);
  cursor: pointer;
  
  &:hover {
    background-color: var(--color-dark);
    border-color: var(--color-dark);
    color: var(--color-offwhite);
  }
`

const EmailLink = styled.a`
  display: inline-block;
  margin-top: 0.5rem;
  color: var(--color-text-primary);
  font-weight: 500;
  text-decoration: underline;
  transition: opacity var(--transition-fast);
  
  &:hover {
    opacity: 0.7;
  }
`

const RevealEmail = () => {
  const [visible, setVisible] = useState(false)
  const emailUser = 'max'
  const emailDomain = 'byte-bandits.com'
  const email = `${emailUser}@${emailDomain}`

  return (
    <div>
      {!visible ? (
        <EmailButton onClick={() => setVisible(true)}>
          E-Mail anzeigen
        </EmailButton>
      ) : (
        <EmailLink href={`mailto:${email}`}>
          {email}
        </EmailLink>
      )}
    </div>
  )
}

export default function Impressum({ onClose }) {
  return (
    <Overlay onClick={onClose}>
      <Modal onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Title>Impressum</Title>
        <Content>
          <p>
            <strong>Bytebandits OÜ</strong><br />
            Tartu mnt 67/1-13b, Kesklinna linnaosa<br />
            Tallinn 10115, Eesti
          </p>
          <p>
            <strong>Management Board:</strong> M. Scherb
          </p>
          <p>
            <strong>Kontakt:</strong><br />
            <RevealEmail />
          </p>
          <p>
            <strong>Registration code:</strong> 17265228<br />
            Registered with Harju County Court
          </p>
          <p>
            <strong>VAT ID (KMKR):</strong> The legal entity is not liable for VAT registration.
          </p>
        </Content>
      </Modal>
    </Overlay>
  )
}
