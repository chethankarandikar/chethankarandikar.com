import styled from '@emotion/styled'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const ProjectsSection = styled.section`
  padding: 3rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 80px);
  
  @media (max-width: 768px) {
    padding: 2rem 1rem;
    min-height: calc(100vh - 120px);
  }
`

const ProjectsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  width: 100%;
  max-width: 1000px;
`

const ProjectCard = styled(motion.div)`
  border-radius: 12px;
  overflow: hidden;
  background: ${props => props.theme === 'dark' ? '#1e1e1e' : '#ffffff'};
  box-shadow: ${props => props.theme === 'dark' 
    ? '0 10px 30px rgba(0, 0, 0, 0.2)' 
    : '0 10px 30px rgba(0, 0, 0, 0.05)'};
  transition: background var(--theme-transition-speed) ease, box-shadow var(--theme-transition-speed) ease;
  will-change: background, box-shadow;
`

const ProjectHeader = styled.div`
  display: flex;
  flex-direction: column;
`

const ProjectHeaderContent = styled.div`
  padding: 2rem 2rem 1rem;
  order: 1;
`

const ThumbnailContainer = styled.div`
  width: 100%;
  aspect-ratio: 16/9;
  overflow: hidden;
  order: 2;
`

const ProjectThumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  &:hover {
    transform: scale(1.02);
  }
`

const ProjectTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#333333'};
  text-transform: lowercase;
  transition: color var(--theme-transition-speed) ease;
  will-change: color;
  
  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`

const ProjectDescription = styled.p`
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#555555'};
  font-size: 1.1rem;
  line-height: 1.7;
  margin: 0;
  text-transform: lowercase;
  transition: color var(--theme-transition-speed) ease;
  will-change: color;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const ProjectContent = styled.div`
  padding: 1rem 2rem 2rem;
`

const ProjectImages = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin: 1.5rem 0;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`

const ImageContainer = styled.div`
  width: 100%;
  aspect-ratio: 1;
  background: ${props => props.theme === 'dark' ? '#2a2a2a' : '#f5f5f5'};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: ${props => props.theme === 'dark' 
    ? '0 4px 12px rgba(0, 0, 0, 0.3)' 
    : '0 4px 12px rgba(0, 0, 0, 0.1)'};
  transition: transform 0.3s ease, background var(--theme-transition-speed) ease, box-shadow var(--theme-transition-speed) ease;
  will-change: transform, background, box-shadow;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
  }
`

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const ImageCaption = styled.div`
  color: ${props => props.theme === 'dark' ? '#999999' : '#777777'};
  font-size: 0.9rem;
  text-align: center;
  padding: 0.7rem 0;
  width: 100%;
  text-transform: lowercase;
  transition: color var(--theme-transition-speed) ease;
`

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`

const ProjectLink = styled.a`
  color: ${props => props.theme === 'dark' ? '#64b5f6' : '#1976d2'};
  text-decoration: none;
  font-size: 1rem;
  transition: opacity 0.3s ease, color var(--theme-transition-speed) ease;
  
  &:hover {
    opacity: 0.8;
  }
`

const ProjectVideo = styled.div`
  width: 100%;
  margin: 2rem 0;
  iframe {
    width: 100%;
    aspect-ratio: 16/9;
    border: none;
    border-radius: 8px;
    box-shadow: ${props => props.theme === 'dark' 
      ? '0 4px 15px rgba(0, 0, 0, 0.2)' 
      : '0 4px 15px rgba(0, 0, 0, 0.05)'};
    transition: box-shadow var(--theme-transition-speed) ease;
    will-change: box-shadow;
  }
`

const ExpandedImageOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.theme === 'dark' 
    ? 'rgba(26, 26, 26, 0.95)' 
    : 'rgba(255, 255, 255, 0.95)'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: background var(--theme-transition-speed) ease;
  will-change: background;
`

const ExpandedImageContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 90%;
  max-height: 90vh;
`

const ExpandedImage = styled(motion.img)`
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: ${props => props.theme === 'dark' 
    ? '0 10px 30px rgba(0, 0, 0, 0.3)' 
    : '0 10px 30px rgba(0, 0, 0, 0.1)'};
  margin-bottom: 1rem;
  transition: box-shadow var(--theme-transition-speed) ease;
  will-change: box-shadow;
`

const ExpandedCaption = styled.div`
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#333333'};
  font-size: 1.2rem;
  font-weight: 500;
  text-align: center;
  margin-top: 1rem;
  text-transform: lowercase;
  transition: color var(--theme-transition-speed) ease;
  will-change: color;
`

// Project data
const projects = [
  {
    id: 1,
    title: "High Altitude Rocket Live Video System",
    thumbnail: "/project-photos/rocket.jpeg",
    images: [
      { src: "/project-photos/soldering.JPG", caption: "Soldering Video Amplifer" },
      { src: "/project-photos/CAM.jpg", caption: "CAM Board" },
      { src: "/project-photos/videobox.jpg", caption: "Video System" },
    ],
    description: "As part of the Illinois Space Society (SEDS) chapter's SpaceShot high altitude rocket project, I helped design a custom multi-camera video system for a high altitude rocket designed to reach more than 100,000 feet. The system streamed real-time video from the rocket to a ground station during launch. I helped develop the camera PCB in KiCad which features an ESP32 micro controller, power and video multiplexers, battery monitoring, and CAN/I²C communication. I also wrote embedded C code to monitor camera power and recording status over UART. Beyond the electronics, I helped integrate transmitters, receivers, and antennas, and ran the ground station during launch at the FAR site in California.",
    youtube: "LAU9tVVYQgk"
  },
  // Add more projects as needed
]

function Projects({ theme }) {
  const [expandedImage, setExpandedImage] = useState(null)
  const [visibleProjects, setVisibleProjects] = useState([])
  
  // Implement loading optimization
  useEffect(() => {
    setVisibleProjects(projects)
  }, [])

  const handleImageClick = (image) => {
    setExpandedImage(image)
  }

  const handleCloseExpanded = () => {
    setExpandedImage(null)
  }

  return (
    <ProjectsSection>
      <ProjectsGrid>
        {visibleProjects.map((project) => (
          <ProjectCard
            key={project.id}
            theme={theme}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ProjectHeader>
              <ProjectHeaderContent>
                <ProjectTitle theme={theme}>{project.title}</ProjectTitle>
                <ProjectDescription theme={theme}>
                  {project.description}
                </ProjectDescription>
              </ProjectHeaderContent>
              <ThumbnailContainer>
                <ProjectThumbnail src={project.thumbnail} alt={project.title} loading="lazy" />
              </ThumbnailContainer>
            </ProjectHeader>

            <ProjectContent>
              <ProjectImages>
                {project.images.map((image, index) => (
                  <ImageContainer 
                    key={index}
                    theme={theme}
                    onClick={() => handleImageClick(image)}
                  >
                    <ProjectImage
                      src={image.src}
                      alt={`${project.title} - ${image.caption}`}
                      loading="lazy"
                    />
                  </ImageContainer>
                ))}
              </ProjectImages>
              {project.youtube && (
                <ProjectVideo theme={theme}>
                  <iframe
                    src={`https://www.youtube.com/embed/${project.youtube}`}
                    title={`${project.title} Video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </ProjectVideo>
              )}
              {project.links && project.links.length > 0 && (
                <ProjectLinks>
                  {project.links.map((link, index) => (
                    <ProjectLink
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      theme={theme}
                    >
                      {link.text}
                    </ProjectLink>
                  ))}
                </ProjectLinks>
              )}
            </ProjectContent>
          </ProjectCard>
        ))}
      </ProjectsGrid>

      <AnimatePresence>
        {expandedImage && (
          <ExpandedImageOverlay
            theme={theme}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseExpanded}
          >
            <ExpandedImageContainer
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ExpandedImage
                theme={theme}
                src={expandedImage.src}
                alt="Expanded view"
              />
              <ExpandedCaption theme={theme}>
                {expandedImage.caption}
              </ExpandedCaption>
            </ExpandedImageContainer>
          </ExpandedImageOverlay>
        )}
      </AnimatePresence>
    </ProjectsSection>
  )
}

export default Projects