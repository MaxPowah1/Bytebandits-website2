import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useI18n } from '../i18n/i18nContext'

const ServicesContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  place-items: stretch;
  position: relative;
  background:
    radial-gradient(900px 650px at 85% 10%, rgba(11, 13, 18, 0.12), transparent 60%),
    radial-gradient(900px 650px at 18% 80%, rgba(201, 162, 39, 0.10), transparent 58%),
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
  grid-template-columns: 0.95fr 1.05fr;
  gap: clamp(18px, 4vw, 60px);
  align-items: start;

  @media (max-width: 950px) {
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
  position: sticky;
  top: 64px;
  align-self: start;

  @media (max-width: 950px) {
    position: relative;
    top: 0;
  }
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

const Lead = styled(motion.p)`
  margin-top: var(--spacing-4);
  max-width: 62ch;
  font-size: 1.02rem;
  line-height: 1.85;
  color: rgba(11, 13, 18, 0.80);
`

const Right = styled(motion.div)`
  border-left: 1px solid rgba(11, 13, 18, 0.18);
  padding-left: clamp(16px, 2.4vw, 32px);
  min-height: 60vh;

  @media (max-width: 950px) {
    border-left: none;
    padding-left: 0;
    margin-top: var(--spacing-6);
  }
`

const List = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0;
  max-height: calc(100vh - 180px);
  overflow: auto;
  padding-right: 10px;

  @media (max-width: 950px) {
    max-height: none;
    overflow: visible;
    padding-right: 0;
  }
`

const Row = styled(motion.div)`
  position: relative;
  padding: 1.35rem 0;
  border-bottom: 1px solid rgba(11, 13, 18, 0.18);
  display: grid;
  grid-template-columns: 42px 1fr;
  gap: 1rem;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    padding: 1.05rem 0;
    grid-template-columns: 36px 1fr;
    gap: 0.85rem;
  }
`

const Index = styled.div`
  font-family: var(--font-display);
  font-size: 1.2rem;
  color: rgba(201, 162, 39, 0.9);
  letter-spacing: -0.02em;
  padding-top: 0.05rem;
`

const RowTitle = styled.h3`
  font-family: var(--font-body);
  font-weight: 650;
  letter-spacing: -0.01em;
  font-size: 1.02rem;
`

const RowDesc = styled.p`
  margin-top: 0.35rem;
  color: rgba(11, 13, 18, 0.80);
  line-height: 1.7;
`

const Tech = styled.ul`
  margin-top: 0.7rem;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0;

  li {
    font-size: 0.78rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 0.35rem 0.55rem;
    border-radius: 999px;
    border: 1px solid rgba(11, 13, 18, 0.22);
    background: rgba(255, 255, 255, 0.62);
    color: rgba(11, 13, 18, 0.88);
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

export default function Services({ theme = 'bone' }) {
  const { t } = useI18n()
  const services = t('services.items')

  return (
    <ServicesContainer theme={theme}>
      <Grid>
        <Left variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          <Eyebrow variants={rise}>Index</Eyebrow>
          <Title variants={rise}>{t('services.title')}</Title>
          <Lead variants={rise}>{t('services.description')}</Lead>
        </Left>

        <Right variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <List variants={container} initial="hidden" animate="visible">
            {services.map((service, index) => (
              <Row
                key={index}
                variants={rise}
                whileHover={{ x: 2 }}
                transition={{ duration: 0.2 }}
              >
                <Index>{String(index + 1).padStart(2, '0')}</Index>
                <div>
                  <RowTitle>{service.title}</RowTitle>
                  <RowDesc>{service.description}</RowDesc>
                  <Tech>
                    {service.technologies.map((tech, techIndex) => (
                      <li key={techIndex}>{tech}</li>
                    ))}
                  </Tech>
                </div>
              </Row>
            ))}
          </List>
        </Right>
      </Grid>
    </ServicesContainer>
  )
}
