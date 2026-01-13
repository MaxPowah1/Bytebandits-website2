import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import PortfolioCard from '../components/PortfolioCard'
import { useI18n } from '../i18n/i18nContext'
import officeVoiceMeterLogo from '../assets/app_logos/office_voice_meter_logo.png'
import fahrzeugscheinDigitalIcon from '../assets/app_logos/fahrzeugschein_digital_Icon.png'
import waffensachkundeKIIcon from '../assets/app_logos/waffensachkundeKI_icon.png'
import motoleanxIcon from '../assets/app_logos/motoleanx_icon.png'
import batteryManagerIcon from '../assets/app_logos/battery_manager_icon.png'
import pinmycarLogo from '../assets/app_logos/pinmycar_Logo.png'
import mygiftvaultIcon from '../assets/app_logos/mygiftvault_icon.png'
import kidsdentailcareIcon from '../assets/app_logos/kidsdentailcare_icon.png'

const PortfolioContainer = styled.div`
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
  padding: var(--spacing-md) var(--container-padding);
  overflow: hidden;
  
  @media (max-width: 768px) {
    min-height: auto;
    padding: var(--spacing-sm) var(--container-padding);
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
  margin-bottom: 1rem;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.2;
`

const SectionDescription = styled(motion.p)`
  font-size: clamp(0.875rem, 1.2vw, 0.95rem);
  line-height: 1.5;
  opacity: 0.85;
`

const PortfolioGrid = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
  max-height: 100%;
  overflow-y: auto;
  
  /* Hide scrollbar but keep functionality */
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.15) transparent;
  
  &::-webkit-scrollbar {
    width: 2px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.15);
    border-radius: 1px;
  }
  
  @media (max-width: 768px) {
    gap: 0;
  }
`

const StyledPortfolioCard = styled(motion.div)`
  padding: 1rem 0;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  position: relative;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.06);
  isolation: isolate;
  
  &:last-child {
    border-bottom: none;
  }
`

const AppLogo = styled.div`
  width: 40px;
  height: 40px;
  position: absolute;
  top: 1rem;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  opacity: 0.6;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 8px;
  }
`

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-right: 48px;
  
  h3 {
    margin-bottom: 0.25rem;
    font-size: 1.1rem;
    font-weight: 500;
    color: #2d2d2d;
    line-height: 1.4;
    letter-spacing: -0.01em;
  }
  
  p {
    line-height: 1.5;
    opacity: 0.75;
    margin-bottom: 0.375rem;
    color: #2d2d2d;
    font-size: 0.85rem;
  }
  
  a {
    color: #2d2d2d;
    font-size: 0.8rem;
    font-weight: 400;
    text-transform: lowercase;
    letter-spacing: 0.02em;
    transition: opacity 0.2s ease;
    opacity: 0.65;
    
    &:hover {
      opacity: 0.9;
    }
    
    &::after {
      content: ' →';
      opacity: 0.7;
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
      staggerChildren: 0.12,
      delayChildren: 0.3
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

export default function Portfolio() {
  const { t } = useI18n()
  
  const appLinks = [
    'https://play.google.com/store/apps/details?id=com.bytebandits.amitooloud',
    'https://play.google.com/store/apps/details?id=com.bytebandits.fahrzeugscheindigital',
    'https://play.google.com/store/apps/details?id=com.bytebandits.waffensachkundeki',
    'https://play.google.com/store/apps/details?id=com.bytebandits.motoleanx',
    'https://play.google.com/store/apps/details?id=com.bytebandits.smartbatterymanager2',
    'https://play.google.com/store/apps/details?id=com.bytebandits.pinmycar',
    'https://play.google.com/store/apps/details?id=com.bytebandits.mygiftvault',
    'https://play.google.com/store/apps/details?id=com.bytebandits.dentalcareapp'
  ]
  
  const appLogos = [
    officeVoiceMeterLogo,
    fahrzeugscheinDigitalIcon,
    waffensachkundeKIIcon,
    motoleanxIcon,
    batteryManagerIcon,
    pinmycarLogo,
    mygiftvaultIcon,
    kidsdentailcareIcon
  ]
  
  const apps = t('portfolio.apps').map((app, index) => ({
    ...app,
    link: appLinks[index],
    logo: appLogos[index]
  }))

  return (
    <PortfolioContainer>
      <LeftSide>
        <ContentWrapper
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <SectionTitle variants={itemVariants}>{t('portfolio.title')}</SectionTitle>
          <SectionDescription variants={itemVariants}>{t('portfolio.description')}</SectionDescription>
        </ContentWrapper>
      </LeftSide>
      <RightSide>
        <ContentWrapper
          variants={slideInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <PortfolioGrid
            variants={gridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {apps.map((app, index) => (
              <StyledPortfolioCard
                key={index}
                variants={cardVariants}
                whileHover={{ opacity: 0.6, transition: { duration: 0.2 } }}
              >
                <AppLogo>
                  <img src={app.logo} alt={app.name} />
                </AppLogo>
                <CardContent>
                  <h3>{app.name}</h3>
                  <p>{app.description}</p>
                  {app.link && (
                    <a href={app.link} target="_blank" rel="noopener noreferrer">
                      {t('portfolio.appLink')}
                    </a>
                  )}
                </CardContent>
              </StyledPortfolioCard>
            ))}
          </PortfolioGrid>
        </ContentWrapper>
      </RightSide>
    </PortfolioContainer>
  )
}
