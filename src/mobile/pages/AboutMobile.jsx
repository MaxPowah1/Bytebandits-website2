import React from 'react'
import styled from 'styled-components'
import { useI18n } from '../../i18n/i18nContext'

const Wrap = styled.div`
  width: 100%;
  background:
    radial-gradient(900px 650px at 12% 14%, rgba(201, 162, 39, 0.12), transparent 60%),
    radial-gradient(900px 650px at 88% 86%, rgba(11, 13, 18, 0.10), transparent 60%),
    linear-gradient(180deg, rgba(242, 235, 224, 0.98), rgba(231, 221, 206, 0.92));
  color: var(--ink);
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
  color: rgba(11, 13, 18, 0.60);
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
`

const Body = styled.div`
  margin-top: var(--spacing-5);

  p {
    font-size: 1.02rem;
    line-height: 1.9;
    color: rgba(11, 13, 18, 0.82);
    margin-bottom: 1.15rem;
  }

  p:first-of-type::first-letter {
    float: left;
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 3.0rem;
    line-height: 0.9;
    padding-right: 0.35rem;
    margin-top: 0.15rem;
    color: rgba(201, 162, 39, 0.95);
  }
`

const Values = styled.div`
  margin-top: var(--spacing-7);
  display: grid;
  gap: 12px;
`

const Value = styled.div`
  padding: 1.05rem 1.05rem 0.95rem;
  border-radius: var(--radius-md);
  border: 1px solid rgba(11, 13, 18, 0.18);
  background: rgba(255, 255, 255, 0.62);
`

const ValueTitle = styled.h3`
  font-family: var(--font-body);
  font-weight: 750;
  letter-spacing: -0.01em;
  font-size: 0.98rem;
`

const ValueDesc = styled.p`
  margin-top: 0.4rem;
  color: rgba(11, 13, 18, 0.80);
  line-height: 1.7;
  font-size: 0.92rem;
`

export default function AboutMobile() {
  const { t } = useI18n()
  const values = t('about.values')

  return (
    <Wrap>
      <Inner>
        <Eyebrow>Studio Notes</Eyebrow>
        <Title>{t('about.title')}</Title>
        <Body>
          {t('about.paragraphs').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </Body>

        <Values>
          {values.map((value, index) => (
            <Value key={index}>
              <ValueTitle>{value.title}</ValueTitle>
              <ValueDesc>{value.description}</ValueDesc>
            </Value>
          ))}
        </Values>
      </Inner>
    </Wrap>
  )
}

