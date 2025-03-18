import styled from '@emotion/styled'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

const PhotosSection = styled.section`
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 80px); /* Account for header */
  box-sizing: border-box;
`

const PhotoContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 900px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const PhotoWrapper = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const PhotoFrame = styled.div`
  position: relative;
  flex: 1;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  background: ${props => props.theme === 'dark' ? '#2a2a2a' : '#f5f5f5'};
`

const PhotoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const PhotoInfo = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5rem;
`

const PhotoDetails = styled.div`
  display: flex;
  flex-direction: column;
`

const PhotoLocation = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  margin: 0;
`

const PhotoDate = styled.p`
  color: ${props => props.theme === 'dark' ? '#888' : '#666'};
  font-size: 1rem;
  margin: 0;
`

const NavControls = styled.div`
  display: flex;
  gap: 1rem;
`

const NavButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme === 'dark' ? '#888' : '#666'};
  font-size: 1.2rem;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.3s ease;
  padding: 0.5rem;
  
  &:hover {
    opacity: 1;
  }
  
  &:focus {
    outline: none;
  }
`

// Photo data from Travels component
const photos = [
  // 2025
  {
    id: 1,
    url: "/website-photos/mojave.jpg",
    location: "mojave dessert, california",
    coordinates: [],
    date: "2025"
  },
  {
    id: 2,
    url: "/website-photos/uiuc.jpg",
    location: "urbana, illinois",
    coordinates: [],
    date: "2025"
  },
  // 2024
  {
    id: 3,
    url: "/website-photos/maya-beach.jpg",
    location: "maya beach, thailand",
    coordinates: [],
    date: "2024"
  },
  {
    id: 4,
    url: "/website-photos/chiang-mai.jpg",
    location: "chiang mai, thailand",
    coordinates: [],
    date: "2024"
  },
  {
    id: 5,
    url: "/website-photos/bangkok.jpg",
    location: "bangkok, thailand",
    coordinates: [],
    date: "2024"
  },
  {
    id: 6,
    url: "/website-photos/antelope-canyon.jpg",
    location: "antelope canyon, arizona",
    coordinates: [],
    date: "2024"
  },
  {
    id: 7,
    url: "/website-photos/legacy-west.jpg",
    location: "plano, texas",
    coordinates: [],
    date: "2024"
  },
  {
    id: 8,
    url: "/website-photos/lanikai-beach.JPG",
    location: "lanikai beach, hawaii",
    coordinates: [],
    date: "2024"
  },
  // 2023
  {
    id: 9,
    url: "/website-photos/hiroshima.jpg",
    location: "itsukushima, japan",
    coordinates: [],
    date: "2023"
  },
  {
    id: 10,
    url: "/website-photos/kyoto.jpg",
    location: "kyoto, japan",
    coordinates: [],
    date: "2023"
  },
  {
    id: 11,
    url: "/website-photos/lajolla.jpg",
    location: "la jolla, california",
    coordinates: [],
    date: "2023"
  },
  {
    id: 12,
    url: "/website-photos/london.jpg",
    location: "london, england",
    coordinates: []
  }
];


function Photos({ theme }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const INTERVAL_DURATION = 5000; // 5 seconds per photo
  
  const nextPhoto = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % photos.length);
  }, []);
  
  const prevPhoto = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + photos.length) % photos.length);
  }, []);
  
  useEffect(() => {
    if (isPaused) return;
    
    const autoChangeInterval = setInterval(() => {
      nextPhoto();
    }, INTERVAL_DURATION);
    
    return () => clearInterval(autoChangeInterval);
  }, [isPaused, nextPhoto]);
  
  return (
    <PhotosSection>
      <PhotoContainer 
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence mode="wait">
          <PhotoWrapper
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <PhotoFrame theme={theme}>
              <PhotoImage 
                src={photos[currentIndex].url} 
                alt={photos[currentIndex].location} 
              />
            </PhotoFrame>
            
            <PhotoInfo>
              <PhotoDetails>
                <PhotoLocation>{photos[currentIndex].location}</PhotoLocation>
                <PhotoDate theme={theme}>{photos[currentIndex].date}</PhotoDate>
              </PhotoDetails>
              
              <NavControls>
                <NavButton 
                  onClick={prevPhoto}
                  theme={theme}
                >
                  <FaArrowLeft />
                </NavButton>
                
                <NavButton 
                  onClick={nextPhoto}
                  theme={theme}
                >
                  <FaArrowRight />
                </NavButton>
              </NavControls>
            </PhotoInfo>
          </PhotoWrapper>
        </AnimatePresence>
      </PhotoContainer>
    </PhotosSection>
  )
}

export default Photos 