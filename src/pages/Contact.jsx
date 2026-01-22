import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useI18n } from '../i18n/i18nContext'

const ContactContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  place-items: stretch;
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(900px 700px at 22% 18%, rgba(201, 162, 39, 0.16), transparent 58%),
    radial-gradient(900px 700px at 82% 82%, rgba(201, 162, 39, 0.12), transparent 60%),
    linear-gradient(180deg, rgba(16, 20, 38, 0.92), rgba(11, 13, 18, 0.98));
  color: rgba(247, 242, 232, 0.92);

  @media (max-width: 768px) {
    height: auto;
    min-height: 100%;
    padding: var(--spacing-8) var(--container-padding);
  }
`

const Grid = styled.div`
  max-width: var(--container-max-width);
  margin: 0 auto;
  width: 100%;
  height: 100%;
  padding: var(--spacing-9) var(--container-padding);
  display: grid;
  grid-template-columns: 1fr;
  align-content: center;
`

const Eyebrow = styled(motion.div)`
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

const Title = styled(motion.h2)`
  margin-top: var(--spacing-4);
  color: rgba(247, 242, 232, 0.96);
  max-width: 20ch;
`

const Lead = styled(motion.p)`
  margin-top: var(--spacing-5);
  max-width: 70ch;
  font-size: clamp(1.02rem, 1.4vw, 1.22rem);
  line-height: 1.9;
  color: rgba(247, 242, 232, 0.72);
`

const ContactCard = styled(motion.div)`
  margin-top: var(--spacing-7);
  border-radius: var(--radius-lg);
  border: 1px solid rgba(247, 242, 232, 0.16);
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(14px);
  padding: clamp(18px, 2.5vw, 32px);
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.32);
  display: grid;
  gap: 1rem;
`

const Label = styled.div`
  font-size: 0.78rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(247, 242, 232, 0.62);
`

const Email = styled(motion.a)`
  font-family: var(--font-display);
  font-weight: 650;
  letter-spacing: -0.02em;
  font-size: clamp(1.65rem, 4.2vw, 3rem);
  line-height: 1.05;
  color: rgba(247, 242, 232, 0.96);
  display: inline-flex;
  align-items: baseline;
  gap: 0.75rem;

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

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.08 } }
}

const rise = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }
}

export default function Contact({ theme = 'ink' }) {
  const { t } = useI18n()

  return (
    <ContactContainer theme={theme}>
      <Grid>
        <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          <Eyebrow variants={rise}>Final Page</Eyebrow>
          <Title variants={rise}>{t('contact.title')}</Title>
          <Lead variants={rise}>{t('contact.description')}</Lead>

          <ContactCard variants={rise}>
            <div>
              <Label>{t('contact.email')}</Label>
            </div>
            <Email href="mailto:max@byte-bandits.com" variants={rise} whileHover={{ x: 2 }}>
              max@byte-bandits.com
            </Email>
          </ContactCard>
        </motion.div>
      </Grid>
    </ContactContainer>
  )
}
