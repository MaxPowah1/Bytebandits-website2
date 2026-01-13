import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useI18n } from '../i18n/i18nContext'

const AboutContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  position: relative;
  
  @media (max-width: 768px) {
    flex-direction: column;
    min-height: 100vh;
  }
`

const SplitSide = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xl) var(--container-padding);
  overflow: hidden;
  
  @media (max-width: 768px) {
    min-height: 50vh;
    padding: var(--spacing-lg) var(--container-padding);
  }
`

const LeftSide = styled(SplitSide)`
  background-color: #2d2d2d;
  color: #f5f5f5;
  
  * {
    color: #f5f5f5;
  }
`

const RightSide = styled(SplitSide)`
  background-color: #f5f5f5;
  color: #2d2d2d;
  
  * {
    color: #2d2d2d;
  }
`

const ContentWrapper = styled(motion.div)`
  max-width: 600px;
  width: 100%;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
`

const SectionTitle = styled(motion.h2)`
  margin-bottom: 2rem;
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.2;
`

const AboutText = styled(motion.div)`
  p {
    font-size: clamp(0.95rem, 1.3vw, 1rem);
    line-height: 1.7;
    opacity: 0.85;
    margin-bottom: 1.5rem;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`

const ValuesGrid = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
  
  @media (max-width: 768px) {
    gap: 0;
  }
`

const ValueCard = styled(motion.div)`
  padding: 1rem 0;
  position: relative;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.06);
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.7;
  }
  
  &:last-child {
    border-bottom: none;
  }
`

const ValueTitle = styled.h3`
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: -0.01em;
`

const ValueDescription = styled.p`
  line-height: 1.5;
  opacity: 0.75;
  font-size: 0.85rem;
`

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.15
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.0,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

const paragraphVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 0.85,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

export default function About() {
  const { t } = useI18n()
  const values = t('about.values')

  return (
    <AboutContainer>
      <LeftSide>
        <ContentWrapper
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <SectionTitle variants={itemVariants}>{t('about.title')}</SectionTitle>
          <AboutText
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {t('about.paragraphs').map((paragraph, index) => (
              <motion.p key={index} variants={paragraphVariants}>
                {paragraph}
              </motion.p>
            ))}
          </AboutText>
        </ContentWrapper>
      </LeftSide>
      <RightSide>
        <ContentWrapper
          variants={slideInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <ValuesGrid
            variants={gridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {values.map((value, index) => (
              <ValueCard
                key={index}
                variants={cardVariants}
                whileHover={{ opacity: 0.6, transition: { duration: 0.2 } }}
              >
                <ValueTitle>{value.title}</ValueTitle>
                <ValueDescription>{value.description}</ValueDescription>
              </ValueCard>
            ))}
          </ValuesGrid>
        </ContentWrapper>
      </RightSide>
    </AboutContainer>
  )
}
