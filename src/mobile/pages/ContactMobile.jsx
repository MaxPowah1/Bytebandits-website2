import React from 'react'
import styled from 'styled-components'
import { useI18n } from '../../i18n/i18nContext'

const Wrap = styled.div`
  width: 100%;
  background:
    radial-gradient(900px 700px at 22% 18%, rgba(201, 162, 39, 0.16), transparent 58%),
    radial-gradient(900px 700px at 82% 82%, rgba(201, 162, 39, 0.12), transparent 60%),
    linear-gradient(180deg, rgba(16, 20, 38, 0.92), rgba(11, 13, 18, 0.98));
  color: rgba(247, 242, 232, 0.92);
`

const Inner = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
  padding:
    calc(var(--mobile-content-top, 4.5rem))
    calc(var(--container-padding) + var(--safe-left, 0px))
    calc(var(--mobile-content-bottom, 4.5rem))
    calc(var(--container-padding) + var(--safe-right, 0px));
`

const Eyebrow = styled.div`
  font-size: 0.78rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgba(247, 242, 232, 0.70);
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;

  &::before {
    content: "";
    width: 46px;
    height: 1px;
    background: linear-gradient(90deg, rgba(201, 162, 39, 0.85), rgba(201, 162, 39, 0));
  }
`

const Title = styled.h2`
  margin-top: var(--spacing-4);
  color: rgba(247, 242, 232, 0.96);
  max-width: 20ch;
`

const Lead = styled.p`
  margin-top: var(--spacing-5);
  max-width: 70ch;
  font-size: 1.05rem;
  line-height: 1.9;
  color: rgba(247, 242, 232, 0.72);
`

const ContactCard = styled.div`
  margin-top: var(--spacing-7);
  border-radius: var(--radius-lg);
  border: 1px solid rgba(247, 242, 232, 0.16);
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(14px);
  padding: 1.25rem 1.25rem 1.1rem;
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.32);
  display: grid;
  gap: 0.75rem;
`

const Label = styled.div`
  font-size: 0.78rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(247, 242, 232, 0.62);
`

const Email = styled.a`
  font-family: var(--font-display);
  font-weight: 650;
  letter-spacing: -0.02em;
  font-size: clamp(1.35rem, 6.2vw, 2.2rem);
  line-height: 1.1;
  color: rgba(247, 242, 232, 0.96);
  display: inline-flex;
  align-items: baseline;
  gap: 0.75rem;
  overflow-wrap: anywhere;
  word-break: break-word;

  &:hover {
    opacity: 1;
  }

  &::after {
    content: " ↗";
    font-family: var(--font-body);
    font-size: 0.9rem;
    letter-spacing: 0.04em;
    color: rgba(201, 162, 39, 0.95);
    transform: translateY(-0.25em);
  }
`

const LinkRow = styled.div`
  margin-top: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;

  a {
    font-size: 0.78rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(201, 162, 39, 0.95);
  }
`

export default function ContactMobile() {
  const { t } = useI18n()

  return (
    <Wrap>
      <Inner>
        <Eyebrow>Final Page</Eyebrow>
        <Title>{t('contact.title')}</Title>
        <Lead>{t('contact.description')}</Lead>

        <ContactCard>
          <div>
            <Label>{t('contact.email')}</Label>
          </div>
          <Email href="mailto:max@byte-bandits.com">
            max@byte-bandits.com
          </Email>
          <LinkRow>
            <a
              href="#impressum"
              onClick={(e) => {
                e.preventDefault()
                window.scrollToSection?.('impressum')
              }}
            >
              {t('contact.impressum')}
            </a>
          </LinkRow>
        </ContactCard>
      </Inner>
    </Wrap>
  )
}

