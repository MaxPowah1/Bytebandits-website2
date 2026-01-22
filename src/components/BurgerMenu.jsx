import React, { useState } from 'react'
import styled from 'styled-components'

const BurgerButton = styled.button`
  position: fixed;
  top: 1.5rem;
  left: var(--container-padding);
  z-index: 1001;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 0.8rem;
  min-width: 44px;
  min-height: 44px;
  justify-content: center;
  align-items: center;
  background: rgba(11, 13, 18, 0.62);
  border: 1px solid rgba(247, 242, 232, 0.14);
  border-radius: 999px;
  cursor: pointer;
  transition: transform var(--transition-fast), background-color var(--transition-fast), border-color var(--transition-fast);
  backdrop-filter: blur(14px);
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.25);
  
  &:hover {
    background-color: rgba(11, 13, 18, 0.76);
    border-color: rgba(201, 162, 39, 0.35);
    transform: translateY(-1px);
  }
  
  @media (max-width: 768px) {
    top: 1rem;
    left: 1rem;
  }
  
  span {
    width: 22px;
    height: 2px;
    background-color: rgba(247, 242, 232, 0.92);
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
  background:
    radial-gradient(1100px 900px at 18% 14%, rgba(201, 162, 39, 0.18), transparent 60%),
    radial-gradient(900px 700px at 82% 70%, rgba(247, 242, 232, 0.10), transparent 60%),
    rgba(11, 13, 18, 0.88);
  backdrop-filter: blur(22px);
  z-index: 1000;
  display: ${props => props.open ? 'flex' : 'none'};
  flex-direction: column;
  padding: 6rem max(2rem, var(--container-padding)) 2rem;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`

const MenuInner = styled.div`
  max-width: var(--container-max-width);
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
`

const NavLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 100%;
`

const NavLink = styled.li`
  a {
    font-family: var(--font-display);
    font-size: clamp(2rem, 4.5vw, 3.4rem);
    color: rgba(247, 242, 232, 0.92);
    transition: opacity var(--transition-fast), transform var(--transition-fast);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-weight: 600;
    display: block;
    padding: 0.55rem 0;
    min-height: 44px;
    display: flex;
    align-items: center;
    
    &:hover {
      opacity: 1;
      transform: translateX(6px);
    }
  }
`

const Meta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 1.2rem;
  border-top: 1px solid rgba(247, 242, 232, 0.14);

  span {
    font-size: 0.78rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(247, 242, 232, 0.65);
  }

  a {
    font-size: 0.78rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(201, 162, 39, 0.95);
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
        <MenuInner onClick={(e) => e.stopPropagation()}>
          <NavLinks>
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
          <Meta>
            <span>ByteBandits</span>
            <a href="#home" onClick={(e) => handleLinkClick(e, '#home')}>Back to top</a>
          </Meta>
        </MenuInner>
      </MenuOverlay>
    </>
  )
}
