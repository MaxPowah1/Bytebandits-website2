import React from 'react'
import styled from 'styled-components'
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

const Title = styled.h2`
  margin-top: var(--spacing-4);
`

const Lead = styled.p`
  margin-top: var(--spacing-4);
  max-width: 62ch;
  font-size: 1.02rem;
  line-height: 1.85;
  color: rgba(11, 13, 18, 0.80);
`

const List = styled.div`
  margin-top: var(--spacing-7);
  display: grid;
  gap: 12px;
`

const Card = styled.div`
  border-radius: var(--radius-md);
  border: 1px solid rgba(11, 13, 18, 0.18);
  background: rgba(255, 255, 255, 0.62);
  padding: 1rem 1rem 0.9rem;
`

const CardTitle = styled.h3`
  font-family: var(--font-body);
  font-weight: 750;
  letter-spacing: -0.01em;
  font-size: 1.02rem;
`

const CardDesc = styled.p`
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

  return (
    <Wrap>
      <Inner>
        <Eyebrow>Index</Eyebrow>
        <Title>{t('services.title')}</Title>
        <Lead>{t('services.description')}</Lead>

        <List>
          {services.map((service, index) => (
            <Card key={index}>
              <CardTitle>{service.title}</CardTitle>
              <CardDesc>{service.description}</CardDesc>
              <Tech>
                {service.technologies.map((tech, techIndex) => (
                  <li key={techIndex}>{tech}</li>
                ))}
              </Tech>
            </Card>
          ))}
        </List>
      </Inner>
    </Wrap>
  )
}

