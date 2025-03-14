import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useState, useEffect } from 'react'

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

const TravelsSection = styled.section`
  padding: 4rem 0;
`

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 3rem;
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
  height: 700px;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 2rem;
  
  .leaflet-container {
    background-color: #f8f8f8;
  }
  
  /* Hide most controls for a cleaner look */
  .leaflet-control-container {
    display: none;
  }
  
  /* Custom cursor for panning */
  .leaflet-grab {
    cursor: grab;
  }
  
  .leaflet-dragging .leaflet-grab {
    cursor: grabbing;
  }
`

const MapStats = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  font-size: 0.9rem;
`

const StatItem = styled.div`
  text-align: center;
  
  .value {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.25rem;
  }
  
  .label {
    color: ${props => props.theme === 'dark' ? '#888' : '#666'};
  }
`

const SectionTitle = styled(motion.h3)`
  margin-top: 4rem;
  margin-bottom: 1rem;
`

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
]

// Countries you've visited
const visitedCountries = [
  "Egypt",
  "China",
  "India",
  "Japan",
  "Thailand",
  "Turkey",
  "United Arab Emirates",
  "Czech Republic",
  "France",
  "Greece",
  "Italy",
  "Malta",
  "Spain",
  "United Kingdom",
  "England",
  "Canada",
  "Dominican Republic",
  "Haiti",
  "Honduras",
  "Jamaica",
  "Mexico",
  "United States of America",
  // Add more countries as needed
]

function Travels({ theme }) {
  // GeoJSON styling function
  const countryStyle = (feature) => {
    const countryName = feature.properties.name;
    const isVisited = visitedCountries.includes(countryName);
    
    return {
      fillColor: isVisited ? '#000000' : 'transparent',
      weight: 1,
      opacity: 0.8,
      color: '#ccc',
      fillOpacity: isVisited ? 0.7 : 0,
    };
  };

  // Function to load GeoJSON data
  const [geoData, setGeoData] = useState(null);
  const [totalCountries, setTotalCountries] = useState(0);
  
  useEffect(() => {
    // Fetch world GeoJSON data
    fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json')
      .then(response => response.json())
      .then(data => {
        setGeoData(data);
        setTotalCountries(data.features.length);
      })
      .catch(error => console.error('Error loading GeoJSON data:', error));
  }, []);

  // Use a monochrome map tile URL for a cleaner black and white look
  const mapTileUrl = 'https://stamen-tiles.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png';

  // Calculate percentage of world visited
  const percentVisited = totalCountries ? Math.round((visitedCountries.length / totalCountries) * 100) : 0;

  return (
    <TravelsSection>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        my travels
      </motion.h2>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <MapWrapper>
          <MapContainer
            center={[20, 0]}
            zoom={2}
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}
            attributionControl={false}
            dragging={true}
            touchZoom={false}
            doubleClickZoom={false}
            scrollWheelZoom={false}
            boxZoom={false}
            keyboard={false}
            tap={false}
          >
            <TileLayer
              url={mapTileUrl}
              attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
            />
            {geoData && (
              <GeoJSON 
                data={geoData} 
                style={countryStyle}
              />
            )}
          </MapContainer>
        </MapWrapper>
        
        <MapStats theme={theme}>
          <StatItem theme={theme}>
            <div className="value">{visitedCountries.length}</div>
            <div className="label">countries visited</div>
          </StatItem>
          <StatItem theme={theme}>
            <div className="value">{percentVisited}%</div>
            <div className="label">of world explored</div>
          </StatItem>
        </MapStats>
      </motion.div>

      <SectionTitle
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        photos
      </SectionTitle>
      
      <PhotoGrid>
        {photos.map((photo, index) => (
          <PhotoCard
            key={photo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
          >
            <img src={photo.url} alt={photo.location} />
          </PhotoCard>
        ))}
      </PhotoGrid>
    </TravelsSection>
  )
}

export default Travels