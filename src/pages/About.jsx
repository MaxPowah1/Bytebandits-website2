import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useI18n } from '../i18n/i18nContext'

const AboutContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  place-items: stretch;
  position: relative;
  background:
    radial-gradient(900px 650px at 12% 14%, rgba(201, 162, 39, 0.12), transparent 60%),
    radial-gradient(900px 650px at 88% 86%, rgba(11, 13, 18, 0.10), transparent 60%),
    linear-gradient(180deg, rgba(242, 235, 224, 0.98), rgba(231, 221, 206, 0.92));
  color: var(--ink);

  @media (max-width: 768px) {
    height: auto;
    min-height: 100%;
    padding: 0;
  }
`

const Grid = styled.div`
  max-width: var(--container-max-width);
  margin: 0 auto;
  width: 100%;
  height: 100%;
  padding: var(--spacing-9) var(--container-padding);
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: clamp(18px, 4vw, 64px);
  align-items: start;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
    padding: var(--spacing-8) var(--container-padding);
  }

  @media (max-width: 768px) {
    padding-top: var(--mobile-content-top);
    padding-bottom: var(--mobile-content-bottom);
    padding-left: calc(var(--container-padding) + var(--safe-left));
    padding-right: calc(var(--container-padding) + var(--safe-right));
  }
`

const Left = styled(motion.div)`
  position: relative;
`

const Eyebrow = styled(motion.div)`
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

const Title = styled(motion.h2)`
  margin-top: var(--spacing-4);
`

const Body = styled(motion.div)`
  margin-top: var(--spacing-5);
  column-count: 2;
  column-gap: clamp(18px, 3vw, 44px);

  @media (max-width: 980px) {
    column-count: 1;
  }

  p {
    break-inside: avoid;
    font-size: 1.02rem;
    line-height: 1.9;
    color: rgba(11, 13, 18, 0.82);
    margin-bottom: 1.25rem;
  }

  p:first-of-type::first-letter {
    float: left;
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 3.1rem;
    line-height: 0.9;
    padding-right: 0.35rem;
    margin-top: 0.15rem;
    color: rgba(201, 162, 39, 0.95);
  }
`

const PullQuote = styled(motion.blockquote)`
  margin-top: var(--spacing-6);
  padding: 1.35rem 1.35rem 1.15rem;
  border-radius: var(--radius-lg);
  border: 1px solid rgba(11, 13, 18, 0.14);
  background: rgba(255, 255, 255, 0.55);
  box-shadow: var(--shadow-1);

  p {
    font-family: var(--font-display);
    font-weight: 560;
    font-size: clamp(1.2rem, 2.2vw, 1.7rem);
    line-height: 1.35;
    color: rgba(11, 13, 18, 0.92);
  }

  footer {
    margin-top: 0.6rem;
    font-size: 0.78rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--color-text-tertiary);
  }

  @media (max-width: 768px) {
    padding: 1.1rem 1.1rem 0.95rem;
    border-radius: var(--radius-md);
  }
`

const Right = styled(motion.div)`
  border-left: 1px solid rgba(11, 13, 18, 0.18);
  padding-left: clamp(16px, 2.4vw, 32px);

  @media (max-width: 980px) {
    border-left: none;
    padding-left: 0;
    margin-top: var(--spacing-6);
  }
`

const Values = styled(motion.div)`
  display: grid;
  gap: 12px;
`

const Value = styled(motion.div)`
  padding: 1.05rem 1.05rem 0.95rem;
  border-radius: var(--radius-md);
  border: 1px solid rgba(11, 13, 18, 0.18);
  background: rgba(255, 255, 255, 0.62);
  transition: transform var(--transition-fast), border-color var(--transition-fast), background var(--transition-fast);

  &:hover {
    transform: translateY(-1px);
    border-color: rgba(201, 162, 39, 0.35);
    background: rgba(201, 162, 39, 0.06);
  }
`

const ValueTitle = styled.h3`
  font-family: var(--font-body);
  font-weight: 700;
  letter-spacing: -0.01em;
  font-size: 0.98rem;
`

const ValueDesc = styled.p`
  margin-top: 0.4rem;
  color: rgba(11, 13, 18, 0.80);
  line-height: 1.7;
  font-size: 0.92rem;
`

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.08 } }
}

const rise = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }
}

export default function About({ theme = 'bone' }) {
  const { t } = useI18n()
  const values = t('about.values')
  const quote = values?.map(v => v.title).join(' · ')

  return (
    <AboutContainer theme={theme}>
      <Grid>
        <Left variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
          <Eyebrow variants={rise}>Studio Notes</Eyebrow>
          <Title variants={rise}>{t('about.title')}</Title>
          <Body variants={container} initial="hidden" animate="visible">
            {t('about.paragraphs').map((paragraph, index) => (
              <motion.p key={index} variants={rise}>
                {paragraph}
              </motion.p>
            ))}
          </Body>
          <PullQuote variants={rise}>
            <p>“{quote}.”</p>
            <footer>ByteBandits</footer>
          </PullQuote>
        </Left>

        <Right variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <Values variants={container} initial="hidden" animate="visible">
            {values.map((value, index) => (
              <Value key={index} variants={rise}>
                <ValueTitle>{value.title}</ValueTitle>
                <ValueDesc>{value.description}</ValueDesc>
              </Value>
            ))}
          </Values>
        </Right>
      </Grid>
    </AboutContainer>
  )
}
