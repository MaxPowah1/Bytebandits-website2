import React from 'react'
import styled from 'styled-components'
import { motion, useReducedMotion } from 'framer-motion'
import { useI18n } from '../../i18n/i18nContext'

const Wrap = styled.div`
  width: 100%;
  background:
    radial-gradient(900px 650px at 85% 10%, rgba(11, 13, 18, 0.12), transparent 60%),
    radial-gradient(900px 650px at 18% 80%, rgba(201, 162, 39, 0.10), transparent 58%),
    linear-gradient(180deg, rgba(242, 235, 224, 0.98), rgba(231, 221, 206, 0.92));
  color: var(--ink);
`

const Inner = styled.div`
  max-width: var(--container-max-width);
  margin: 0 auto;
  width: 100%;
  padding:
    calc(var(--mobile-content-top, 4.5rem))
    calc(var(--container-padding) + var(--safe-left, 0px))
    calc(var(--mobile-content-bottom, 4.5rem))
    calc(var(--container-padding) + var(--safe-right, 0px));
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

const List = styled(motion.div)`
  margin-top: var(--spacing-6);
  display: flex;
  flex-direction: column;
  gap: 0;
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

  @media (max-width: 380px) {
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

export default function ServicesMobile() {
  const { t } = useI18n()
  const services = t('services.items')
  const shouldReduceMotion = useReducedMotion()

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.08
      }
    }
  }

  const rise = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.9,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  return (
    <Wrap>
      <Inner>
        <Eyebrow
          variants={rise}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          Index
        </Eyebrow>
        <Title
          variants={rise}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {t('services.title')}
        </Title>
        <Lead
          variants={rise}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {t('services.description')}
        </Lead>

        <List
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((service, index) => (
            <Row
              key={index}
              variants={rise}
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
      </Inner>
    </Wrap>
  )
}

