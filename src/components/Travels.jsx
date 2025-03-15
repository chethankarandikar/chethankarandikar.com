import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

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

const PhotosButton = styled(Link)`
  display: inline-block;
  margin-top: 3rem;
  padding: 0.8rem 1.5rem;
  background: ${props => props.theme === 'dark' ? '#333' : '#f0f0f0'};
  color: ${props => props.theme === 'dark' ? '#fff' : '#333'};
  border-radius: 4px;
  text-decoration: none;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme === 'dark' ? '#444' : '#e0e0e0'};
    transform: translateY(-2px);
  }
`

// Keep the photos array for reference but we won't display it

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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        style={{ textAlign: 'center', width: '100%' }}
      >
        <PhotosButton to="/gallery" theme={theme}>
          See Travel Photos
        </PhotosButton>
      </motion.div>
    </TravelsSection>
  )
}

export default Travels