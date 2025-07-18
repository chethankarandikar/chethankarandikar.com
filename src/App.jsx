import { Analytics } from "@vercel/analytics/react"

import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Travels from './components/Travels'
import Quotes from './components/Quotes'
import Photos from './components/Photos'
import Projects from './components/Projects'
import './App.css'

// Global styles with CSS Custom Properties
const AppContainer = styled.div`
  --theme-transition-speed: 0.2s;
  min-height: 100vh;
  background-color: ${props => props.theme === 'dark' ? '#1a1a1a' : '#ffffff'};
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#1a1a1a'};
  transition: background-color var(--theme-transition-speed) ease, color var(--theme-transition-speed) ease;
  will-change: background-color, color;
`

const Header = styled.header`
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${props => props.theme === 'dark' ? '#1a1a1a' : '#ffffff'};
  z-index: 1000;
  transition: background-color var(--theme-transition-speed) ease;
  will-change: background-color;
  
  @media (max-width: 768px) {
    padding: 1rem;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    gap: 1rem;
    order: 3;
    width: 100%;
    margin-top: 0.5rem;
    justify-content: center;
  }
`

const NavLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color var(--theme-transition-speed) ease;
  
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -4px;
    left: 0;
    background-color: currentColor;
    transition: width 0.3s ease;
  }
  
  &:hover:after {
    width: 100%;
  }
`

const SocialLinks = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
  margin-top: 2rem;
`

const SocialLink = styled.a`
  color: inherit;
  font-size: 1rem;
  text-transform: lowercase;
  text-decoration: none;
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color var(--theme-transition-speed) ease;
  
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -4px;
    left: 0;
    background-color: currentColor;
    transition: width 0.3s ease;
  }
  
  &:hover:after {
    width: 100%;
  }
`

const ThemeToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
  font-size: 0.9rem;
  padding: 0.5rem 0.8rem;
  border-radius: 4px;
  transition: background-color var(--theme-transition-speed) ease, color var(--theme-transition-speed) ease;
  text-transform: lowercase;
  letter-spacing: 0.5px;
  
  &:hover {
    background-color: ${props => props.theme === 'dark' ? '#333' : '#f0f0f0'};
  }
  
  @media (max-width: 768px) {
    order: 2;
  }
`

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  padding-top: 6rem;
  transition: background-color var(--theme-transition-speed) ease, color var(--theme-transition-speed) ease;
  
  @media (max-width: 768px) {
    padding: 1rem;
    padding-top: 7rem;
  }
`

const HeroSection = styled.section`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  
  @media (max-width: 768px) {
    min-height: 70vh;
  }
`

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  color: ${props => props.theme === 'dark' ? '#888' : '#666'};
  margin-bottom: 2rem;
  transition: color var(--theme-transition-speed) ease;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`

const BioText = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.8;
  max-width: 600px;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.6;
  }
`

const BioLink = styled.a`
  color: ${props => props.theme === 'dark' ? '#64b5f6' : '#1976d2'};
  text-decoration: none;
  font-weight: 500;
  transition: color var(--theme-transition-speed) ease;
  position: relative;
  
  &:hover {
    color: ${props => props.theme === 'dark' ? '#90caf9' : '#0d47a1'};
  }
`

function App() {
  const [theme, setTheme] = useState('light')
  
  // Use localStorage to remember theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', newTheme)
      return newTheme
    })
  }
  
  // Add a class to the HTML element for global CSS access
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <Router>
      <AppContainer theme={theme}>
        <Header theme={theme}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            chethan karandikar
          </motion.div>
          <Nav>
            <NavLink to="/">home</NavLink>
            {/* <NavLink to="/travels">travels</NavLink> */}
            <NavLink to="/photos">photos</NavLink>
            <NavLink to="/projects">projects</NavLink>
            {/* <NavLink to="/quotes">quotes</quotes> */}
          </Nav>
          <ThemeToggle theme={theme} onClick={toggleTheme}>
            {theme === 'light' ? 'dark' : 'light'}
          </ThemeToggle>
        </Header>
        
        <MainContent>
          <Routes>
            <Route path="/" element={
              <>
                <HeroSection>
                  <Title
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    hi, i'm chethan karandikar
                  </Title>
                  
                  <BioText
                    theme={theme}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    I'm a 19-year-old computer engineering student at UIUC who loves building things, listening to music, taking photos, and traveling the world.
                  </BioText>
                  <SocialLinks>
                    <SocialLink href="https://github.com/chethankarandikar" target="_blank" rel="noopener noreferrer">
                      github
                    </SocialLink>
                    <SocialLink href="https://linkedin.com/in/chethankarandikar" target="_blank" rel="noopener noreferrer">
                      linkedin
                    </SocialLink>
                    <SocialLink as="span" tabIndex="-1" style={{ cursor: 'default', pointerEvents: 'none' }}>
                      updated june 2025
                    </SocialLink>
                  </SocialLinks>
                </HeroSection>
              </>
            } />
            {/* <Route path="/travels" element={<Travels theme={theme} />} /> */}
            <Route path="/photos" element={<Photos theme={theme} />} />
            <Route path="/projects" element={<Projects theme={theme} />} />
            {/* <Route path="/quotes" element={<Quotes theme={theme} />} /> */}
          </Routes>
        </MainContent>
        <Analytics />
      </AppContainer>
    </Router>
  )
}

export default App
