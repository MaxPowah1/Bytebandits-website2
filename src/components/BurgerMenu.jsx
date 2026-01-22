import React, { useState } from 'react'
import styled from 'styled-components'

const BurgerButton = styled.button`
  position: fixed;
  top: 1.5rem;
  right: var(--container-padding);
  z-index: 1001;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 0.75rem;
  min-width: 44px;
  min-height: 44px;
  justify-content: center;
  align-items: center;
  background-color: rgba(45, 45, 45, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  cursor: pointer;
  transition: background-color var(--transition-fast), border-color var(--transition-fast);
  backdrop-filter: blur(10px);
  
  &:hover {
    background-color: rgba(45, 45, 45, 1);
    border-color: rgba(255, 255, 255, 0.2);
  }
  
  @media (max-width: 768px) {
    top: 1rem;
    right: 1rem;
  }
  
  span {
    width: 22px;
    height: 2px;
    background-color: #f5f5f5;
    transition: all 0.3s ease;
    transform-origin: center;
    
    &:nth-child(1) {
      transform: ${props => props.open ? 'rotate(45deg) translateY(7px)' : 'none'};
    }
    
    &:nth-child(2) {
      opacity: ${props => props.open ? '0' : '1'};
    }
    
    &:nth-child(3) {
      transform: ${props => props.open ? 'rotate(-45deg) translateY(-7px)' : 'none'};
    }
  }
`

const MenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(245, 245, 245, 0.98);
  backdrop-filter: blur(20px);
  z-index: 1000;
  display: ${props => props.open ? 'flex' : 'none'};
  flex-direction: column;
  padding: 5rem 2rem 2rem;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  
  @media (prefers-color-scheme: dark) {
    background-color: rgba(45, 45, 45, 0.98);
  }
`

const NavLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`

const NavLink = styled.li`
  a {
    font-size: 1.2rem;
    color: var(--color-text-primary);
    transition: opacity var(--transition-fast);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 500;
    display: block;
    padding: 0.75rem 0;
    min-height: 44px;
    display: flex;
    align-items: center;
    
    &:hover {
      opacity: 0.6;
    }
  }
`

export default function BurgerMenu({ scrollToSection }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleLinkClick = (e, href) => {
    e.preventDefault()
    const sectionId = href.replace('#', '')
    if (scrollToSection) {
      scrollToSection(sectionId)
    }
    setIsOpen(false)
  }

  return (
    <>
      <BurgerButton open={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </BurgerButton>
      <MenuOverlay open={isOpen} onClick={() => setIsOpen(false)}>
        <NavLinks onClick={(e) => e.stopPropagation()}>
          <NavLink>
            <a href="#home" onClick={(e) => handleLinkClick(e, '#home')}>Home</a>
          </NavLink>
          <NavLink>
            <a href="#services" onClick={(e) => handleLinkClick(e, '#services')}>Services</a>
          </NavLink>
          <NavLink>
            <a href="#portfolio" onClick={(e) => handleLinkClick(e, '#portfolio')}>Portfolio</a>
          </NavLink>
          <NavLink>
            <a href="#about" onClick={(e) => handleLinkClick(e, '#about')}>About</a>
          </NavLink>
          <NavLink>
            <a href="#contact" onClick={(e) => handleLinkClick(e, '#contact')}>Contact</a>
          </NavLink>
        </NavLinks>
      </MenuOverlay>
    </>
  )
}
