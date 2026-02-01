import React from 'react'
import styled from 'styled-components'
import { motion, useReducedMotion } from 'framer-motion'
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


export default function AboutMobile() {
  const { t } = useI18n()
  const paragraphs = t('about.paragraphs')
  const shouldReduceMotion = useReducedMotion()

  const rise = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.85,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  const list = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.12
      }
    }
  }

  return (
    <Wrap>
      <Inner>
        <Eyebrow variants={rise} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }}>
          Studio Notes
        </Eyebrow>
        <Title variants={rise} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }}>
          {t('about.title')}
        </Title>
        <Body
          variants={list}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          {paragraphs.map((paragraph, index) => (
            <motion.p key={index} variants={rise}>
              {paragraph}
            </motion.p>
          ))}
        </Body>
      </Inner>
    </Wrap>
  )
}

