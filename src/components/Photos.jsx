import styled from '@emotion/styled'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

const PhotosSection = styled.section`
  padding: 2rem;
  min-height: 100vh;
  background: ${props => props.theme === 'dark' ? '#1a1a1a' : '#ffffff'};
`

const PhotosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  max-width: 1200px;
  margin: 0 auto;
`

const PhotoCard = styled(motion.div)`
  position: relative;
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
  background: ${props => props.theme === 'dark' ? '#2a2a2a' : '#f5f5f5'};
  cursor: pointer;
`

const PhotoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const PhotoInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  color: white;
`

const PhotoLocation = styled.p`
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
`

const PhotoDate = styled.p`
  margin: 0.25rem 0 0 0;
  font-size: 0.9rem;
  opacity: 0.8;
`

const ExpandedOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  cursor: pointer;
`

const ExpandedImage = styled(motion.img)`
  max-width: 90%;
  max-height: 90vh;
  object-fit: contain;
`

// Photo data from Travels component
const photos = [
  // 2025
  {
    id: 1,
    url: "/website-photos/mojave.jpg",
    location: "mojave desert, california",
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
    url: "/website-photos/chiang-mai.jpeg",
    location: "chiang mai, thailand",
    coordinates: [],
    date: "2024"
  },
  {
    id: 6,
    url: "/website-photos/bangkok.jpg",
    location: "bangkok, thailand",
    coordinates: [],
    date: "2024"
  },
  {
    id: 7,
    url: "/website-photos/antelope-canyon.jpg",
    location: "antelope canyon, arizona",
    coordinates: [],
    date: "2024"
  },
  {
    id: 8,
    url: "/website-photos/legacy-west.jpg",
    location: "plano, texas",
    coordinates: [],
    date: "2024"
  },
  {
    id: 9,
    url: "/website-photos/lanikai-beach.JPG",
    location: "lanikai beach, hawaii",
    coordinates: [],
    date: "2024"
  },
  // 2023
  {
    id: 10,
    url: "/website-photos/hiroshima.jpg",
    location: "itsukushima, japan",
    coordinates: [],
    date: "2023"
  },
  {
    id: 11,
    url: "/website-photos/kyoto.jpg",
    location: "kyoto, japan",
    coordinates: [],
    date: "2023"
  },
  {
    id: 12,
    url: "/website-photos/lajolla.jpg",
    location: "la jolla, california",
    coordinates: [],
    date: "2023"
  },
  {
    id: 13,
    url: "/website-photos/london.jpg",
    location: "london, england",
    coordinates: []
  }
];

function Photos({ theme }) {
  const [expandedPhoto, setExpandedPhoto] = useState(null);

  const handlePhotoClick = (photo) => {
    setExpandedPhoto(photo);
  };

  const handleCloseExpanded = () => {
    setExpandedPhoto(null);
  };

  return (
    <PhotosSection theme={theme}>
      <PhotosGrid>
        {photos.map((photo) => (
          <PhotoCard
            key={photo.id}
            theme={theme}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => handlePhotoClick(photo)}
          >
            <PhotoImage 
              src={photo.url} 
              alt={photo.location} 
            />
            <PhotoInfo>
              <PhotoLocation>{photo.location}</PhotoLocation>
              {photo.date && <PhotoDate>{photo.date}</PhotoDate>}
            </PhotoInfo>
          </PhotoCard>
        ))}
      </PhotosGrid>

      <AnimatePresence>
        {expandedPhoto && (
          <ExpandedOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseExpanded}
          >
            <ExpandedImage
              src={expandedPhoto.url}
              alt={expandedPhoto.location}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            />
          </ExpandedOverlay>
        )}
      </AnimatePresence>
    </PhotosSection>
  )
}

export default Photos 