import React, { useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  place-items: stretch;
  background:
    radial-gradient(900px 650px at 12% 14%, rgba(201, 162, 39, 0.10), transparent 60%),
    linear-gradient(180deg, rgba(247, 242, 232, 0.96), rgba(239, 231, 218, 0.90));
  color: rgba(11, 13, 18, 0.92);
`

const Inner = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
  padding: var(--spacing-8) var(--container-padding);

  @media (max-width: 768px) {
    padding-top: var(--mobile-content-top);
    padding-bottom: calc(var(--mobile-content-bottom) + 1rem);
    padding-left: calc(var(--container-padding) + var(--safe-left));
    padding-right: calc(var(--container-padding) + var(--safe-right));
  }
`

const Title = styled.h2`
  color: rgba(11, 13, 18, 0.92);
`

const Content = styled.div`
  margin-top: var(--spacing-5);
  color: rgba(11, 13, 18, 0.72);
  line-height: 1.85;

  p {
    margin-bottom: 1.25rem;
  }

  strong {
    color: rgba(11, 13, 18, 0.92);
    font-weight: 700;
  }
`

const EmailButton = styled.button`
  display: inline-block;
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(11, 13, 18, 0.16);
  color: rgba(11, 13, 18, 0.92);
  font-size: 0.9rem;
  font-weight: 500;
  border-radius: 999px;
  transition: background-color var(--transition-fast), border-color var(--transition-fast);
  cursor: pointer;

  &:hover {
    background-color: rgba(11, 13, 18, 0.90);
    border-color: rgba(11, 13, 18, 0.90);
    color: rgba(247, 242, 232, 0.92);
  }
`

const EmailLink = styled.a`
  display: inline-block;
  margin-top: 0.5rem;
  color: rgba(11, 13, 18, 0.92);
  font-weight: 600;
  text-decoration: underline;
  transition: opacity var(--transition-fast);

  &:hover {
    opacity: 0.7;
  }
`

function RevealEmail() {
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

export default function ImpressumPage() {
  return (
    <Wrapper>
      <Inner>
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
      </Inner>
    </Wrapper>
  )
}

