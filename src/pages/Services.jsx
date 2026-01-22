import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useI18n } from '../i18n/i18nContext'

const ServicesContainer = styled.div`
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
  padding: var(--spacing-lg) var(--container-padding);
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
  margin-bottom: 1.5rem;
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.2;
`

const SectionDescription = styled(motion.p)`
  font-size: clamp(0.95rem, 1.3vw, 1rem);
  line-height: 1.6;
  opacity: 0.85;
`

const ServicesGrid = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
  
  @media (max-width: 768px) {
    gap: 0;
  }
`

const ServiceCard = styled(motion.div)`
  padding: 1rem 0;
  flex-shrink: 0;
  position: relative;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.06);
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.7;
  }
  
  &:last-child {
    border-bottom: none;
  }
  
  @media (max-width: 768px) {
    border-bottom-color: ${props => props.theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)'};
  }
`

const ServiceTitle = styled.h3`
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: -0.01em;
`

const ServiceDescription = styled.p`
  line-height: 1.5;
  opacity: 0.75;
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
`

const ServiceList = styled.ul`
  list-style: none;
  margin-top: 0.5rem;
  padding: 0;
  
  li {
    padding: 0.25rem 0;
    opacity: 0.7;
    position: relative;
    padding-left: 0;
    font-size: 0.8rem;
    font-weight: 300;
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

export default function Services({ theme = 'light' }) {
  const { t } = useI18n()
  const services = t('services.items')

  return (
    <ServicesContainer theme={theme}>
      <LeftSide theme={theme}>
        <ContentWrapper
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <SectionTitle variants={itemVariants}>{t('services.title')}</SectionTitle>
          <SectionDescription variants={itemVariants}>{t('services.description')}</SectionDescription>
        </ContentWrapper>
      </LeftSide>
      <RightSide theme={theme}>
        <ContentWrapper
          variants={slideInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <ServicesGrid
            variants={gridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                theme={theme}
                dark={false}
                variants={cardVariants}
                whileHover={{ opacity: 0.6, transition: { duration: 0.2 } }}
              >
                <ServiceTitle>{service.title}</ServiceTitle>
                <ServiceDescription>{service.description}</ServiceDescription>
                <ServiceList>
                  {service.technologies.map((tech, techIndex) => (
                    <li key={techIndex}>{tech}</li>
                  ))}
                </ServiceList>
              </ServiceCard>
            ))}
          </ServicesGrid>
        </ContentWrapper>
      </RightSide>
    </ServicesContainer>
  )
}
