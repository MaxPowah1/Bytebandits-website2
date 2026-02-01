import React from 'react'
import styled from 'styled-components'
import { useI18n } from '../../i18n/i18nContext'

import officeVoiceMeterLogo from '../../assets/app_logos/office_voice_meter_logo.png'
import fahrzeugscheinDigitalIcon from '../../assets/app_logos/fahrzeugschein_digital_Icon.png'
import waffensachkundeKIIcon from '../../assets/app_logos/waffensachkundeKI_icon.png'
import motoleanxIcon from '../../assets/app_logos/motoleanx_icon.png'
import batteryManagerIcon from '../../assets/app_logos/battery_manager_icon.png'
import pinmycarLogo from '../../assets/app_logos/pinmycar_Logo.png'
import mygiftvaultIcon from '../../assets/app_logos/mygiftvault_icon.png'
import kidsdentailcareIcon from '../../assets/app_logos/kidsdentailcare_icon.png'

const Wrap = styled.div`
  width: 100%;
  background:
    radial-gradient(950px 700px at 18% 14%, rgba(201, 162, 39, 0.14), transparent 58%),
    radial-gradient(900px 750px at 78% 88%, rgba(201, 162, 39, 0.10), transparent 60%),
    linear-gradient(180deg, rgba(16, 20, 38, 0.92), rgba(11, 13, 18, 0.98));
  color: rgba(247, 242, 232, 0.92);
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

const Eyebrow = styled.div`
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

const Title = styled.h2`
  margin-top: var(--spacing-4);
  color: rgba(247, 242, 232, 0.96);
`

const Lead = styled.p`
  margin-top: var(--spacing-4);
  max-width: 62ch;
  font-size: 1.02rem;
  line-height: 1.85;
  color: rgba(247, 242, 232, 0.72);
`

const List = styled.div`
  margin-top: var(--spacing-7);
  display: grid;
  gap: 10px;
`

const Item = styled.a`
  display: grid;
  grid-template-columns: 52px 1fr;
  gap: 0.95rem;
  padding: 1.05rem 0;
  border-bottom: 1px solid rgba(247, 242, 232, 0.14);
  color: rgba(247, 242, 232, 0.92);

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    opacity: 1;
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
`

const ItemTitle = styled.h3`
  font-family: var(--font-display);
  font-weight: 650;
  letter-spacing: -0.02em;
  color: rgba(247, 242, 232, 0.96);
  font-size: 1.35rem;
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

export default function PortfolioMobile() {
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
    <Wrap>
      <Inner>
        <Eyebrow>Selected Work</Eyebrow>
        <Title>{t('portfolio.title')}</Title>
        <Lead>{t('portfolio.description')}</Lead>

        <List>
          {apps.map((app, index) => (
            <Item key={index} href={app.link} target="_blank" rel="noopener noreferrer">
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
        </List>
      </Inner>
    </Wrap>
  )
}

