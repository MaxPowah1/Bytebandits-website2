import React from 'react'
import styled from 'styled-components'

const Card = styled.div`
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  padding: 2rem;
  transition: transform var(--transition-medium), box-shadow var(--transition-medium);
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`

const CardImage = styled.div`
  width: 100%;
  height: 200px;
  background-color: var(--color-bg-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  border: 1px solid var(--color-border);
  
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`

const CardTitle = styled.h3`
  margin-bottom: 1rem;
  font-size: 1.5rem;
`

const CardDescription = styled.p`
  color: var(--color-text-secondary);
  line-height: 1.8;
  margin-bottom: 1.5rem;
  flex: 1;
`

const CardLink = styled.a`
  display: inline-block;
  color: var(--color-text-primary);
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: opacity var(--transition-fast);
  
  &:hover {
    opacity: 0.6;
  }
  
  &::after {
    content: ' →';
  }
`

export default function PortfolioCard({ app }) {
  return (
    <Card>
      <CardImage>
        {app.image ? (
          <img src={app.image} alt={app.name} />
        ) : (
          <div style={{ color: 'var(--color-gray-dark)', fontSize: '3rem' }}>📱</div>
        )}
      </CardImage>
      <CardTitle>{app.name}</CardTitle>
      <CardDescription>{app.description}</CardDescription>
      {app.link && (
        <CardLink href={app.link} target="_blank" rel="noopener noreferrer">
          Zur App
        </CardLink>
      )}
    </Card>
  )
}
