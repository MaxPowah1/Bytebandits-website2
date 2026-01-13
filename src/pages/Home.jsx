import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useI18n } from '../i18n/i18nContext'
import logo from '../assets/company_logo/logo.png'

const HomeContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    min-height: 100vh;
  }
`

const SplitSide = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xl) var(--container-padding);
  position: relative;
  
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

const LogoImage = styled(motion.img)`
  width: clamp(350px, 45vw, 700px);
  height: auto;
  filter: invert(1);
  display: block;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    width: clamp(220px, 55vw, 450px);
  }
`


const RightContent = styled(motion.div)`
  h2 {
    font-size: clamp(1.5rem, 3vw, 2.5rem);
    margin-bottom: 1.5rem;
    font-weight: 600;
    letter-spacing: -0.02em;
  }
  
  p {
    font-size: clamp(0.95rem, 1.3vw, 1.1rem);
    line-height: 1.8;
    opacity: 0.7;
    margin-bottom: 1.5rem;
  }
`

const FeatureList = styled(motion.ul)`
  list-style: none;
  margin-top: 2rem;
  
  li {
    padding: 0.4rem 0;
    font-size: clamp(0.95rem, 1.2vw, 1rem);
    line-height: 1.6;
    opacity: 0.8;
    position: relative;
    padding-left: 1.5rem;
    
    &::before {
      content: '—';
      position: absolute;
      left: 0;
      opacity: 0.6;
    }
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

const logoVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.2,
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

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.4
    }
  }
}

const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 0.8,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

export default function Home() {
  const { t } = useI18n()

  return (
    <HomeContainer>
      <LeftSide>
        <LogoImage 
          src={logo} 
          alt="ByteBandits Logo"
          variants={logoVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        />
      </LeftSide>
      <RightSide>
        <ContentWrapper
          variants={slideInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <RightContent variants={containerVariants} initial="hidden" animate="visible">
            <motion.h2 variants={itemVariants}>{t('home.rightTitle')}</motion.h2>
            <motion.p variants={itemVariants}>{t('home.rightDescription')}</motion.p>
            <FeatureList
              variants={listVariants}
              initial="hidden"
              animate="visible"
            >
              {t('home.features').map((feature, index) => (
                <motion.li key={index} variants={listItemVariants}>
                  {feature}
                </motion.li>
              ))}
            </FeatureList>
          </RightContent>
        </ContentWrapper>
      </RightSide>
    </HomeContainer>
  )
}
