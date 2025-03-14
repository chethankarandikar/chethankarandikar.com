import { Analytics } from "@vercel/analytics/react"

import { useState } from 'react'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Travels from './components/Travels'
import Quotes from './components/Quotes'
import './App.css'

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme === 'dark' ? '#1a1a1a' : '#ffffff'};
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#1a1a1a'};
  transition: all 0.3s ease;
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
`

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
`

const NavLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
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
  gap: 1rem;
  margin-top: 2rem;
`

const SocialLink = styled.a`
  color: inherit;
  font-size: 1.5rem;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 0.8;
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
  transition: all 0.3s ease;
  text-transform: lowercase;
  letter-spacing: 0.5px;
  
  &:hover {
    background-color: ${props => props.theme === 'dark' ? '#333' : '#f0f0f0'};
  }
`

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  padding-top: 6rem;
`

const HeroSection = styled.section`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`

const Title = styled(motion.h1)`
  font-size: 4rem;
  margin-bottom: 1rem;
`

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  color: ${props => props.theme === 'dark' ? '#888' : '#666'};
  margin-bottom: 2rem;
`

const BioText = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.8;
  max-width: 600px;
  margin-bottom: 2rem;
`

const BioLink = styled.a`
  color: ${props => props.theme === 'dark' ? '#64b5f6' : '#1976d2'};
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    color: ${props => props.theme === 'dark' ? '#90caf9' : '#0d47a1'};
  }
`

function App() {
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

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
            <NavLink to="/photos">travels</NavLink>
            <NavLink to="/quotes">quotes</NavLink>
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
                    i'm a 18 y/o computer engineering student at uiuc with a love for hardware and software development. 
                    i'm currently working as an undergraduate research assistant at <BioLink href="https://lassiaero.web.illinois.edu/about-lassi/" target="_blank" rel="noopener noreferrer" theme={theme}>lassi </BioLink> 
                    and as an avionics hardware engineer with the <BioLink href="https://illinoisspacesociety.org" target="_blank" rel="noopener noreferrer" theme={theme}>illinois space society.</BioLink>
                  </BioText>
                  <SocialLinks>
                    <SocialLink href="https://github.com/chethankarandikar" target="_blank" rel="noopener noreferrer">
                      <FaGithub />
                    </SocialLink>
                    <SocialLink href="https://linkedin.com/in/chethankarandikar" target="_blank" rel="noopener noreferrer">
                      <FaLinkedin />
                    </SocialLink>
                  </SocialLinks>
                </HeroSection>
              </>
            } />
            <Route path="/photos" element={<Travels theme={theme} />} />
            <Route path="/quotes" element={<Quotes theme={theme} />} />
          </Routes>
        </MainContent>
        <Analytics />
      </AppContainer>
    </Router>
  )
}

export default App
