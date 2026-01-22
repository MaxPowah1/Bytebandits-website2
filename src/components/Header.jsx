import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(245, 245, 245, 0.98);
  backdrop-filter: blur(10px);
  z-index: 1000;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    background-color: rgba(245, 245, 245, 0.95);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  }
  
  @media (prefers-color-scheme: dark) {
    background-color: rgba(45, 45, 45, 0.98);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    
    @media (max-width: 768px) {
      background-color: rgba(45, 45, 45, 0.95);
      border-bottom: 1px solid rgba(255, 255, 255, 0.15);
    }
  }
`

const Nav = styled.nav`
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: 1.5rem var(--container-padding);
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text-primary);
  letter-spacing: -0.02em;
`

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  gap: 2.5rem;
  align-items: center;

  @media (max-width: 768px) {
    display: ${props => props.open ? 'flex' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    flex-direction: column;
    background-color: rgba(245, 245, 245, 0.98);
    backdrop-filter: blur(20px);
    padding: 5rem 2rem 2rem;
    gap: 2rem;
    justify-content: flex-start;
    align-items: flex-start;
    z-index: 999;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    border: none;
    box-shadow: none;
  }
  
  @media (prefers-color-scheme: dark) {
    @media (max-width: 768px) {
      background-color: rgba(45, 45, 45, 0.98);
    }
  }
`

const NavLink = styled.li`
  a {
    font-size: 0.95rem;
    color: var(--color-text-primary);
    transition: opacity var(--transition-fast);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 500;
    
    &:hover {
      opacity: 0.6;
    }
    
    @media (max-width: 768px) {
      font-size: 1.1rem;
      padding: 0.75rem 0;
      display: block;
      width: 100%;
      min-height: 44px;
      display: flex;
      align-items: center;
    }
  }
`

const MenuButton = styled.button`
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 0.5rem;
  min-width: 44px;
  min-height: 44px;
  justify-content: center;
  align-items: center;
  z-index: 1001;
  position: relative;
  
  @media (max-width: 768px) {
    display: flex;
  }
  
  span {
    width: 25px;
    height: 2px;
    background-color: var(--color-text-primary);
    transition: all 0.3s ease;
    transform-origin: center;
    
    &:nth-child(1) {
      transform: ${props => props.open ? 'rotate(45deg) translateY(8px)' : 'none'};
    }
    
    &:nth-child(2) {
      opacity: ${props => props.open ? '0' : '1'};
    }
    
    &:nth-child(3) {
      transform: ${props => props.open ? 'rotate(-45deg) translateY(-8px)' : 'none'};
    }
  }
`

export default function Header({ scrollToSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLinkClick = (e, href) => {
    e.preventDefault()
    const sectionId = href.replace('#', '')
    if (scrollToSection) {
      scrollToSection(sectionId)
    }
    setMobileMenuOpen(false)
  }

  return (
    <HeaderContainer>
      <Nav>
        <Logo>ByteBandits</Logo>
        <MenuButton open={mobileMenuOpen} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </MenuButton>
        <NavLinks open={mobileMenuOpen}>
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
      </Nav>
    </HeaderContainer>
  )
}
