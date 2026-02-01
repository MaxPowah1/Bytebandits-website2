import React from 'react'
import styled from 'styled-components'
import { useI18n } from '../../i18n/i18nContext'
import logoMark from '../../assets/company_logo/logo_ohne_company_namen.png'

const Wrap = styled.div`
  width: 100%;
  background:
    radial-gradient(900px 700px at 15% 15%, rgba(201, 162, 39, 0.16), transparent 55%),
    radial-gradient(900px 700px at 85% 85%, rgba(201, 162, 39, 0.10), transparent 60%),
    linear-gradient(180deg, rgba(16, 20, 38, 0.92), rgba(11, 13, 18, 0.98));
  color: rgba(247, 242, 232, 0.92);
`

const Inner = styled.div`
  max-width: 760px;
  margin: 0 auto;
  width: 100%;
  padding:
    calc(var(--mobile-content-top, 4.5rem))
    calc(var(--container-padding) + var(--safe-left, 0px))
    calc(var(--mobile-content-bottom, 4.5rem))
    calc(var(--container-padding) + var(--safe-right, 0px));
`

const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.78rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgba(247, 242, 232, 0.70);

  &::before {
    content: "";
    width: 46px;
    height: 1px;
    background: linear-gradient(90deg, rgba(201, 162, 39, 0.85), rgba(201, 162, 39, 0));
  }
`

const EyebrowMark = styled.img`
  width: 18px;
  height: 18px;
  filter: invert(1);
  opacity: 0.85;
`

const Title = styled.h1`
  margin-top: var(--spacing-4);
  color: rgba(247, 242, 232, 0.96);
  max-width: 16ch;
`

const SubTitle = styled.p`
  margin-top: var(--spacing-5);
  max-width: 60ch;
  font-size: 1.05rem;
  line-height: 1.85;
  color: rgba(247, 242, 232, 0.72);
`

const CTA = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: var(--spacing-6);
  padding: 0.9rem 1.1rem;
  border-radius: 999px;
  border: 1px solid rgba(247, 242, 232, 0.18);
  background: rgba(255, 255, 255, 0.04);
  color: rgba(247, 242, 232, 0.92);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-size: 0.82rem;
  backdrop-filter: blur(12px);
  transition: transform var(--transition-fast), background var(--transition-fast), border-color var(--transition-fast);

  &:hover {
    opacity: 1;
    transform: translateY(-1px);
    border-color: rgba(201, 162, 39, 0.45);
    background: rgba(201, 162, 39, 0.12);
  }
`

const Panel = styled.div`
  margin-top: var(--spacing-7);
  border-radius: var(--radius-lg);
  border: 1px solid rgba(247, 242, 232, 0.14);
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(14px);
  padding: 1.25rem 1.25rem 1.1rem;
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.32);
`

const PanelTitle = styled.div`
  font-family: var(--font-body);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.82rem;
  font-weight: 650;
  color: rgba(247, 242, 232, 0.88);
  margin-bottom: var(--spacing-3);
`

const PanelText = styled.p`
  color: rgba(247, 242, 232, 0.72);
  font-size: 0.98rem;
  line-height: 1.75;
`

const FeatureList = styled.ul`
  margin-top: var(--spacing-5);
  list-style: none;
  display: grid;
  gap: 0.65rem;
  padding: 0;

  li {
    display: flex;
    align-items: baseline;
    gap: 0.75rem;
    color: rgba(247, 242, 232, 0.82);
    font-size: 0.92rem;
  }
`

const Bullet = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.6), rgba(201, 162, 39, 0.95));
  box-shadow: 0 0 0 4px rgba(201, 162, 39, 0.14);
  flex: 0 0 auto;
  transform: translateY(-1px);
`

export default function HomeMobile() {
  const { t } = useI18n()

  return (
    <Wrap>
      <Inner>
        <Eyebrow>
          <EyebrowMark src={logoMark} alt="" aria-hidden="true" />
          ByteBandits Studio
        </Eyebrow>
        <Title>{t('home.title')}</Title>
        <SubTitle>{t('home.subtitle')}</SubTitle>
        <CTA
          href="#portfolio"
          onClick={(e) => {
            e.preventDefault()
            window.scrollToSection?.('portfolio')
          }}
        >
          {t('home.cta')} <span aria-hidden>→</span>
        </CTA>

        <Panel>
          <PanelTitle>{t('home.rightTitle')}</PanelTitle>
          <PanelText>{t('home.rightDescription')}</PanelText>
          <FeatureList>
            {t('home.features').map((feature, index) => (
              <li key={index}>
                <Bullet aria-hidden />
                <span>{feature}</span>
              </li>
            ))}
          </FeatureList>
        </Panel>
      </Inner>
    </Wrap>
  )
}

