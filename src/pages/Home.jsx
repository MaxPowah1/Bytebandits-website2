import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useI18n } from '../i18n/i18nContext'
import logo from '../assets/company_logo/logo.png'
import logoMark from '../assets/company_logo/logo_ohne_company_namen.png'

const HomeContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  place-items: stretch;
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(900px 700px at 15% 15%, rgba(201, 162, 39, 0.16), transparent 55%),
    radial-gradient(900px 700px at 85% 85%, rgba(201, 162, 39, 0.10), transparent 60%),
    linear-gradient(180deg, rgba(16, 20, 38, 0.92), rgba(11, 13, 18, 0.98));
  color: rgba(247, 242, 232, 0.92);

  @media (max-width: 768px) {
    height: auto;
    min-height: 100%;
    padding: var(--spacing-8) var(--container-padding);
  }
`

const BackgroundMark = styled.img`
  position: absolute;
  right: -6vmax;
  top: -7vmax;
  width: min(740px, 60vw);
  height: auto;
  pointer-events: none;
  user-select: none;
  filter: invert(1) saturate(0.9) contrast(1.05);
  opacity: 0.06;
  transform: rotate(12deg);
  mix-blend-mode: screen;

  @media (max-width: 900px) {
    right: -10vmax;
    top: -12vmax;
    width: min(640px, 95vw);
    opacity: 0.05;
  }
`

const Grid = styled.div`
  max-width: var(--container-max-width);
  margin: 0 auto;
  width: 100%;
  height: 100%;
  padding: var(--spacing-9) var(--container-padding);
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: clamp(22px, 4vw, 64px);
  align-items: start;
  align-content: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    align-items: start;
    padding: var(--spacing-8) var(--container-padding);
  }
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

const EyebrowMark = styled.img`
  width: 18px;
  height: 18px;
  filter: invert(1);
  opacity: 0.8;
`

const HeroTitle = styled(motion.h1)`
  margin-top: var(--spacing-4);
  max-width: 16ch;
  color: rgba(247, 242, 232, 0.96);
`

const SubTitle = styled(motion.p)`
  margin-top: var(--spacing-5);
  max-width: 60ch;
  font-size: clamp(1.02rem, 1.35vw, 1.2rem);
  line-height: 1.8;
  color: rgba(247, 242, 232, 0.72);
`

const CTA = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: var(--spacing-6);
  padding: 0.9rem 1.1rem;
  border-radius: 999px;
  border: 1px solid rgba(247, 242, 232, 0.18);
  background: rgba(255, 255, 255, 0.04);
  color: rgba(247, 242, 232, 0.92);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-size: 0.82rem;
  backdrop-filter: blur(12px);
  transition: transform var(--transition-fast), background var(--transition-fast), border-color var(--transition-fast);

  &:hover {
    opacity: 1;
    transform: translateY(-1px);
    border-color: rgba(201, 162, 39, 0.45);
    background: rgba(201, 162, 39, 0.12);
  }
`

const Panel = styled(motion.div)`
  align-self: start;
  justify-self: stretch;
  border-radius: var(--radius-lg);
  border: 1px solid rgba(247, 242, 232, 0.14);
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(14px);
  padding: clamp(18px, 2.2vw, 28px);
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.32);
  margin-top: var(--spacing-6);
`

const PanelTitle = styled.h3`
  font-family: var(--font-body);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.82rem;
  font-weight: 600;
  color: rgba(247, 242, 232, 0.88);
  margin-bottom: var(--spacing-3);
`

const PanelText = styled.p`
  color: rgba(247, 242, 232, 0.72);
  font-size: 0.95rem;
  line-height: 1.75;
`

const FeatureList = styled.ul`
  margin-top: var(--spacing-5);
  list-style: none;
  display: grid;
  gap: 0.65rem;

  li {
    display: flex;
    align-items: baseline;
    gap: 0.75rem;
    color: rgba(247, 242, 232, 0.82);
    font-size: 0.92rem;
  }
`

const Bullet = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.6), rgba(201, 162, 39, 0.95));
  box-shadow: 0 0 0 4px rgba(201, 162, 39, 0.14);
  flex: 0 0 auto;
  transform: translateY(-1px);
`

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  }
}

const rise = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }
}

export default function Home({ theme = 'ink' }) {
  const { t } = useI18n()

  return (
    <HomeContainer theme={theme}>
      <BackgroundMark src={logoMark} alt="" aria-hidden="true" />
      <Grid>
        <motion.div variants={container} initial="hidden" animate="visible">
          <Eyebrow variants={rise}>
            <EyebrowMark src={logoMark} alt="" aria-hidden="true" />
            ByteBandits Studio
          </Eyebrow>
          <HeroTitle variants={rise}>{t('home.title')}</HeroTitle>
          <SubTitle variants={rise}>{t('home.subtitle')}</SubTitle>
          <CTA
            variants={rise}
            href="#portfolio"
            onClick={(e) => {
              e.preventDefault()
              window.scrollToSection?.('portfolio')
            }}
          >
            {t('home.cta')} <span aria-hidden>→</span>
          </CTA>
        </motion.div>

        <motion.div variants={container} initial="hidden" animate="visible">
          <Panel variants={rise}>
            <PanelTitle>{t('home.rightTitle')}</PanelTitle>
            <PanelText>{t('home.rightDescription')}</PanelText>
            <FeatureList>
              {t('home.features').map((feature, index) => (
                <li key={index}>
                  <Bullet aria-hidden />
                  <span>{feature}</span>
                </li>
              ))}
            </FeatureList>
          </Panel>
        </motion.div>
      </Grid>
    </HomeContainer>
  )
}
