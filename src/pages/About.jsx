import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useI18n } from '../i18n/i18nContext'

const AboutContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  place-items: center;
  position: relative;
  background:
    radial-gradient(900px 650px at 12% 14%, rgba(201, 162, 39, 0.12), transparent 60%),
    radial-gradient(900px 650px at 88% 86%, rgba(11, 13, 18, 0.10), transparent 60%),
    linear-gradient(180deg, rgba(242, 235, 224, 0.98), rgba(231, 221, 206, 0.92));
  color: var(--ink);

  @media (max-width: 768px) {
    height: auto;
    min-height: 100%;
    place-items: stretch;
    padding: 0;
  }
`

const Grid = styled.div`
  max-width: var(--container-max-width);
  margin: 0 auto;
  width: 100%;
  height: auto;
  padding: var(--spacing-8) var(--container-padding);
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(18px, 4vw, 64px);
  align-items: start;

  @media (max-width: 980px) {
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
  max-width: 820px;
  margin: 0 auto;
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
  display: grid;
  gap: 1.1rem;

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
  const paragraphs = t('about.paragraphs')

  return (
    <AboutContainer theme={theme}>
      <Grid>
        <Left variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
          <Eyebrow variants={rise}>Studio Notes</Eyebrow>
          <Title variants={rise}>{t('about.title')}</Title>
          <Body variants={container} initial="hidden" animate="visible">
            {paragraphs.map((paragraph, index) => (
              <motion.p key={index} variants={rise}>
                {paragraph}
              </motion.p>
            ))}
          </Body>
        </Left>
      </Grid>
    </AboutContainer>
  )
}
