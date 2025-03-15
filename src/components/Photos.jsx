import styled from '@emotion/styled'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

const PhotosSection = styled.section`
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: calc(100vh - 80px); /* Account for header */
  box-sizing: border-box;
`

const PhotoContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 900px;
  margin: 1.5rem auto 0;
  height: calc(100% - 60px); /* Account for title */
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
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    location: "Paris, France",
    coordinates: [48.8566, 2.3522],
    date: "2023"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    location: "Tokyo, Japan",
    coordinates: [35.6762, 139.6503],
    date: "2023"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    location: "Venice, Italy",
    coordinates: [45.4408, 12.3155],
    date: "2022"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    location: "Santorini, Greece",
    coordinates: [36.3932, 25.4615],
    date: "2022"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1555899434-94d1368aa7af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    location: "New York, USA",
    coordinates: [40.7128, -74.0060],
    date: "2021"
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1562979314-bee7453e911c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    location: "Taj Mahal, India",
    coordinates: [27.1751, 78.0421],
    date: "2021"
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
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        travel photos
      </motion.h2>
      
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