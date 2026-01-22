import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useI18n } from '../i18n/i18nContext'

const ContactContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  
  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    min-height: 100%;
    background-color: ${props => props.theme === 'dark' ? '#2d2d2d' : '#f5f5f5'};
    padding: var(--spacing-lg) var(--container-padding);
    padding-top: var(--spacing-lg);
    padding-bottom: var(--spacing-lg);
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
    min-height: auto;
    padding: 0;
    overflow: visible;
    width: 100%;
    flex: none;
  }
`

const LeftSide = styled(SplitSide)`
  background-color: #2d2d2d;
  color: #f5f5f5;
  
  * {
    color: #f5f5f5;
  }
  
  @media (max-width: 768px) {
    background-color: transparent;
    color: ${props => props.theme === 'dark' ? '#f5f5f5' : '#2d2d2d'};
    margin-bottom: var(--spacing-lg);
    
    * {
      color: ${props => props.theme === 'dark' ? '#f5f5f5' : '#2d2d2d'};
    }
  }
`

const RightSide = styled(SplitSide)`
  background-color: #f5f5f5;
  color: #2d2d2d;
  
  * {
    color: #2d2d2d;
  }
  
  @media (max-width: 768px) {
    background-color: transparent;
    color: ${props => props.theme === 'dark' ? '#f5f5f5' : '#2d2d2d'};
    
    * {
      color: ${props => props.theme === 'dark' ? '#f5f5f5' : '#2d2d2d'};
    }
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

const ContactText = styled(motion.p)`
  font-size: clamp(0.95rem, 1.3vw, 1rem);
  line-height: 1.7;
  opacity: 0.85;
  margin-bottom: 2rem;
`

const ContactInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: flex-start;
`

const ContactItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const ContactLabel = styled(motion.span)`
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.7;
  font-weight: 500;
`

const ContactValue = styled(motion.a)`
  font-size: clamp(1.1rem, 2vw, 1.5rem);
  font-weight: 500;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: currentColor;
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
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

const infoVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.3
    }
  }
}

const itemInfoVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

export default function Contact({ theme = 'dark' }) {
  const { t } = useI18n()

  return (
    <ContactContainer theme={theme}>
      <LeftSide theme={theme}>
        <ContentWrapper
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <SectionTitle variants={itemVariants}>{t('contact.title')}</SectionTitle>
          <ContactText variants={itemVariants}>{t('contact.description')}</ContactText>
        </ContentWrapper>
      </LeftSide>
      <RightSide theme={theme}>
        <ContentWrapper
          variants={slideInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <ContactInfo
            variants={infoVariants}
            initial="hidden"
            animate="visible"
          >
            <ContactItem variants={itemInfoVariants}>
              <ContactLabel variants={itemInfoVariants}>{t('contact.email')}</ContactLabel>
              <ContactValue
                href="mailto:max@byte-bandits.com"
                variants={itemInfoVariants}
                whileHover={{ scale: 1.02 }}
              >
                max@byte-bandits.com
              </ContactValue>
            </ContactItem>
          </ContactInfo>
        </ContentWrapper>
      </RightSide>
    </ContactContainer>
  )
}
