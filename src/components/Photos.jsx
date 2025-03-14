import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Import marker icons
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

// Fix for default marker icons in react-leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

const PhotosSection = styled.section`
  padding: 4rem 0;
`

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 4rem;
`

const PhotoCard = styled(motion.div)`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 1;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`

const MapWrapper = styled.div`
  height: 400px;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 2rem;
`

const photos = [
  {
    id: 1,
    url: "https://via.placeholder.com/400",
    location: "Paris, France",
    coordinates: [48.8566, 2.3522],
    date: "2023"
  },
  {
    id: 2,
    url: "https://via.placeholder.com/400",
    location: "Tokyo, Japan",
    coordinates: [35.6762, 139.6503],
    date: "2023"
  },
  // Add more photos as needed
]

function Photos({ theme }) {
  return (
    <PhotosSection>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My Travels
      </motion.h2>
      
      <PhotoGrid>
        {photos.map((photo, index) => (
          <PhotoCard
            key={photo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <img src={photo.url} alt={photo.location} />
          </PhotoCard>
        ))}
      </PhotoGrid>

      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Places I've Been
      </motion.h3>

      <MapWrapper>
        <MapContainer
          center={[20, 0]}
          zoom={2}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {photos.map((photo) => (
            <Marker key={photo.id} position={photo.coordinates}>
              <Popup>
                <div>
                  <h4>{photo.location}</h4>
                  <p>{photo.date}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </MapWrapper>
    </PhotosSection>
  )
}

export default Photos 