import styled from '@emotion/styled'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const ProjectsSection = styled.section`
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 80px);
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding: 1rem 0;
    min-height: calc(100vh - 120px);
  }
`

const ProjectsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 100%;
  max-width: 1200px;
  padding: 0 1rem;
`

const ProjectCard = styled(motion.div)`
  background: ${props => props.theme === 'dark' ? '#2a2a2a' : '#f5f5f5'};
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 2rem;
`

const ProjectHeader = styled.div`
  display: flex;
  flex-direction: column;
`

const ProjectHeaderContent = styled.div`
  padding: 1.5rem;
  order: 1;
`

const ThumbnailContainer = styled.div`
  width: 100%;
  aspect-ratio: 16/9;
  background: ${props => props.theme === 'dark' ? '#1a1a1a' : '#f0f0f0'};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  order: 2;
`

const ProjectThumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const ProjectTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 500;
  margin: 0 0 1rem 0;
  
  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`

const ProjectDescription = styled.p`
  color: ${props => props.theme === 'dark' ? '#888' : '#666'};
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const ProjectContent = styled(motion.div)`
  padding: 0 1.5rem 1.5rem;
  border-top: 1px solid ${props => props.theme === 'dark' ? '#333' : '#ddd'};
`

const ProjectImages = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
`

const ImageContainer = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  background: ${props => props.theme === 'dark' ? '#1a1a1a' : '#f0f0f0'};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
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
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 0.8;
  }
`

const ExpandedImageOverlay = styled(motion.div)`
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

const ExpandedImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  max-width: 90%;
  max-height: 90vh;
`

const ExpandedImageCaption = styled.div`
  color: white;
  font-size: 1.2rem;
  text-align: center;
  padding: 0.5rem;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  max-width: 100%;
`

const ImageCaption = styled.div`
  color: ${props => props.theme === 'dark' ? '#888' : '#666'};
  font-size: 0.9rem;
  text-align: center;
  padding: 0.5rem;
  background: ${props => props.theme === 'dark' ? '#1a1a1a' : '#f0f0f0'};
  border-radius: 0 0 4px 4px;
  width: 100%;
`

// Comment out ProjectVideo component
/*
const ProjectVideo = styled.div`
  width: 100%;
  margin-top: 1.5rem;
  video {
    width: 100%;
    aspect-ratio: 16/9;
    border: none;
    border-radius: 4px;
    background: ${props => props.theme === 'dark' ? '#1a1a1a' : '#f0f0f0'};
  }
`
*/

// Project data
const projects = [
  {
    id: 1,
    title: "High Altitude Rocket Live Video System",
    thumbnail: "/project-photos/rocket.jpeg",
    images: [
      { src: "/project-photos/schematic.jpeg", caption: "CAM Board Schematic" },
      { src: "/project-photos/CAM.jpg", caption: "CAM Board" },
      { src: "/project-photos/videobox.jpg", caption: "Video System" },
    ],
    description: "As part of the Illinois Space Society (SEDS) chapter's SpaceShot high altitude rocket project, I designed a custom multi-camera system for a rocket flight to over 100,000 feet. The system streamed real-time video from the rocket to a ground station during launch. I built the camera PCB in KiCad, with an ESP32 at the core, along with power and video multiplexers, battery monitoring, and CAN/I²C communication. I also wrote embedded C code to monitor camera power and recording status over UART. Beyond the electronics, I helped integrate the transmitters, receivers, and antennas, and ran the ground station during launch at the FAR site in California.",
    // video: "/project-photos/rocket-video.mp4" // Commented out video property
  },
  // {
  //   id: 2,
  //   title: "Project 2",
  //   thumbnail: "/project-photos/project2-thumb.jpg",
  //   images: [
  //     "/project-photos/project2-1.jpg",
  //     "/project-photos/project2-2.jpg"
  //   ],
  //   description: "Description of project 2. What it does, technologies used, and what you learned.",
  //   links: [
  //     { text: "GitHub", url: "https://github.com/yourusername/project2" }
  //   ]
  // },
  // Add more projects as needed
]

function Projects({ theme }) {
  const [expandedImage, setExpandedImage] = useState(null)

  const handleImageClick = (image) => {
    setExpandedImage(image)
  }

  const handleCloseExpanded = () => {
    setExpandedImage(null)
  }

  return (
    <ProjectsSection>
      <ProjectsGrid>
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            theme={theme}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ProjectHeader>
              <ProjectHeaderContent>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription theme={theme}>
                  {project.description}
                </ProjectDescription>
              </ProjectHeaderContent>
              <ThumbnailContainer theme={theme}>
                <ProjectThumbnail src={project.thumbnail} alt={project.title} />
              </ThumbnailContainer>
            </ProjectHeader>

            <ProjectContent theme={theme}>
              <ProjectImages>
                {project.images.map((image, index) => (
                  <div key={index}>
                    <ImageContainer 
                      theme={theme}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleImageClick(image)
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <ProjectImage
                        src={image.src}
                        alt={`${project.title} - ${image.caption}`}
                      />
                    </ImageContainer>
                    <ImageCaption theme={theme}>
                      {image.caption}
                    </ImageCaption>
                  </div>
                ))}
              </ProjectImages>
              {/* Commented out video section
              {project.video && (
                <ProjectVideo theme={theme}>
                  <video
                    src={project.video}
                    controls
                    playsInline
                    title={`${project.title} Video`}
                  >
                    Your browser does not support the video tag.
                  </video>
                </ProjectVideo>
              )}
              */}
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseExpanded}
          >
            <ExpandedImage
              src={expandedImage.src}
              alt="Expanded view"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          </ExpandedImageOverlay>
        )}
      </AnimatePresence>
    </ProjectsSection>
  )
}

export default Projects 