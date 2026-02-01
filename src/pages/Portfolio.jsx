import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
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
  height: 100vh;
  display: grid;
  place-items: stretch;
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(950px 700px at 18% 14%, rgba(201, 162, 39, 0.14), transparent 58%),
    radial-gradient(900px 750px at 78% 88%, rgba(201, 162, 39, 0.10), transparent 60%),
    linear-gradient(180deg, rgba(16, 20, 38, 0.92), rgba(11, 13, 18, 0.98));
  color: rgba(247, 242, 232, 0.92);

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
  grid-template-columns: 0.9fr 1.1fr;
  gap: clamp(18px, 4vw, 64px);
  align-items: start;

  @media (max-width: 980px) {
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

  @media (max-width: 980px) {
    position: relative;
    top: 0;
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

const Title = styled(motion.h2)`
  margin-top: var(--spacing-4);
  color: rgba(247, 242, 232, 0.96);
`

const Lead = styled(motion.p)`
  margin-top: var(--spacing-4);
  max-width: 62ch;
  font-size: 1.02rem;
  line-height: 1.85;
  color: rgba(247, 242, 232, 0.72);
`

const Right = styled(motion.div)`
  border-left: 1px solid rgba(247, 242, 232, 0.14);
  padding-left: clamp(16px, 2.4vw, 32px);

  @media (max-width: 980px) {
    border-left: none;
    padding-left: 0;
    margin-top: var(--spacing-6);
  }
`

const Catalog = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0;
  max-height: calc(100vh - 180px);
  overflow: auto;
  padding-right: 10px;

  @media (max-width: 980px) {
    max-height: none;
    overflow: visible;
    padding-right: 0;
  }
`

const Item = styled(motion.a)`
  position: relative;
  display: grid;
  grid-template-columns: 52px 1fr;
  gap: 1rem;
  padding: 1.35rem 0;
  border-bottom: 1px solid rgba(247, 242, 232, 0.14);
  color: rgba(247, 242, 232, 0.92);

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    opacity: 1;
  }

  @media (max-width: 768px) {
    grid-template-columns: 48px 1fr;
    gap: 0.9rem;
    padding: 1.05rem 0;
  }
`

const Badge = styled.div`
  width: 46px;
  height: 46px;
  border-radius: 14px;
  border: 1px solid rgba(247, 242, 232, 0.18);
  background:
    radial-gradient(circle at 30% 30%, rgba(201, 162, 39, 0.22), transparent 55%),
    rgba(255, 255, 255, 0.03);
  display: grid;
  place-items: center;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.28);

  img {
    width: 76%;
    height: 76%;
    object-fit: contain;
    border-radius: 10px;
  }

  @media (max-width: 768px) {
    width: 42px;
    height: 42px;
    border-radius: 12px;
  }
`

const ItemTitle = styled.h3`
  font-family: var(--font-display);
  font-weight: 620;
  letter-spacing: -0.02em;
  color: rgba(247, 242, 232, 0.96);
  font-size: clamp(1.25rem, 2.2vw, 1.9rem);
`

const ItemDesc = styled.p`
  margin-top: 0.35rem;
  color: rgba(247, 242, 232, 0.70);
  line-height: 1.7;
`

const ItemMeta = styled.div`
  margin-top: 0.7rem;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.78rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(247, 242, 232, 0.66);

  span {
    color: rgba(201, 162, 39, 0.95);
    letter-spacing: 0.12em;
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

export default function Portfolio({ theme = 'ink' }) {
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
    <PortfolioContainer theme={theme}>
      <Grid>
        <Left variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          <Eyebrow variants={rise}>Selected Work</Eyebrow>
          <Title variants={rise}>{t('portfolio.title')}</Title>
          <Lead variants={rise}>{t('portfolio.description')}</Lead>
        </Left>

        <Right variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.12 }}>
          <Catalog variants={container} initial="hidden" animate="visible">
            {apps.map((app, index) => (
              <Item
                key={index}
                href={app.link || '#portfolio'}
                target={app.link ? '_blank' : undefined}
                rel={app.link ? 'noopener noreferrer' : undefined}
                variants={rise}
                whileHover={{ x: 2 }}
              >
                <Badge aria-hidden>
                  <img src={app.logo} alt="" />
                </Badge>
                <div>
                  <ItemTitle>{app.name}</ItemTitle>
                  <ItemDesc>{app.description}</ItemDesc>
                  <ItemMeta>
                    <span>↗</span> {t('portfolio.appLink')}
                  </ItemMeta>
                </div>
              </Item>
            ))}
          </Catalog>
        </Right>
      </Grid>
    </PortfolioContainer>
  )
}
