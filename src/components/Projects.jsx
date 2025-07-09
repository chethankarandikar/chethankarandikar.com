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
  gap: 2rem;
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
  transition: all 0.3s ease;
  will-change: background, box-shadow, transform;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
  }
`

const ProjectHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1.5rem;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`

const ProjectHeaderContent = styled.div`
  flex: 1;
  order: 1;
  min-width: 0;
`

const ThumbnailContainer = styled.div`
  width: 300px;
  height: 180px;
  overflow: hidden;
  border-radius: 8px;
  order: 2;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    width: 100%;
    height: 240px;
  }
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
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#333333'};
  text-transform: lowercase;
  transition: color var(--theme-transition-speed) ease;
  will-change: color;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`

const ProjectDescription = styled.p`
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#555555'};
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
  text-transform: lowercase;
  transition: color var(--theme-transition-speed) ease;
  will-change: color;
  display: ${props => props.isExpanded ? 'block' : 'none'};
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`

const ProjectDateRange = styled.div`
  color: ${props => props.theme === 'dark' ? '#888888' : '#666666'};
  font-size: 0.9rem;
  margin-top: 0.5rem;
  text-transform: lowercase;
  transition: color var(--theme-transition-speed) ease;
  will-change: color;
`

const ProjectContent = styled.div`
  padding: 0 1.5rem 1.5rem;
  display: ${props => props.isExpanded ? 'block' : 'none'};
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

const VideoNote = styled.div`
  color: ${props => props.theme === 'dark' ? '#aaa' : '#666'};
  font-size: 0.95rem;
  margin-top: 0.5rem;
  font-style: italic;
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
    title: "Rocket Live Video",
    dateRange: "September 2024 - May 2025",
    thumbnail: "/project-photos/rocket.jpeg",
    images: [
      { src: "/project-photos/soldering.JPG", caption: "Soldering Video Amplifer" },
      { src: "/project-photos/CAM.jpg", caption: "CAM Board" },
      { src: "/project-photos/videobox.jpg", caption: "Video System" },
    ],
    description: "As part of the Illinois Space Society (SEDS) chapter's SpaceShot high altitude rocket project, I helped design a custom multi-camera video system for a high altitude rocket that flew to 75k+ feet. The system streamed real-time video from the rocket to a ground station during launch. I helped develop the camera PCB in KiCad which features an ESP32 micro controller, power and video multiplexers, battery monitoring, and CAN/I²C communication. I also wrote embedded C code to monitor camera power and recording status over UART. Beyond the electronics, I helped integrate transmitters, receivers, and antennas, and ran the ground station during launch at the FAR site in California.",
    youtube: "5BYeBV-nO4Y"
  },
  {
    id: 3,
    title: "Matrix Multiplier",
    dateRange: "January 2025 - May 2025",
    thumbnail: "/project-photos/matrix-multiplier-thumbnail.jpg",
    description: "built a matrix multiplier using breadboards, digital logic, a finite state machine, and 7-segment displays that computes 2x2 matrix multiplication with 2-bit numbers as input in real time.",
    youtube: "bYsS2kxaklU"
  },
  {
    id: 2,
    title: "Scholar (HackIllinois)",
    dateRange: "February 2025 - March 2025",
    thumbnail: "/project-photos/scholar-thumbnail.jpg",
    description: "Developed Scholar, a personalized scholarship-matching platform using a React front-end paired with an Express/Node.js backend and MongoDB. Used Puppeteer for live data scraping and OpenAI API for insights and matching based on user profile. Students can enter their personal information, such as name, religion, ethnicity, gender, etc, and will receive tailored scholarships that they are eligible for, not only general scholarships but also smaller university-specific ones, providing students with an efficient way to find and apply to scholarships efficiently.",
    youtube: "7ehgsasrK70",
    links: [
      {
        text: "GitHub Repository",
        url: "https://github.com/anshkaggarwal22/HackIllinois"
      }
    ]
  }
]

function Projects({ theme }) {
  const [expandedImage, setExpandedImage] = useState(null)
  const [visibleProjects, setVisibleProjects] = useState([])
  const [expandedProject, setExpandedProject] = useState(null)
  
  useEffect(() => {
    setVisibleProjects(projects)
  }, [])

  const handleImageClick = (image) => {
    setExpandedImage(image)
  }

  const handleCloseExpanded = () => {
    setExpandedImage(null)
  }

  const toggleProject = (projectId) => {
    setExpandedProject(expandedProject === projectId ? null : projectId)
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
            onClick={() => toggleProject(project.id)}
          >
            <ProjectHeader>
              <ProjectHeaderContent>
                <ProjectTitle theme={theme}>{project.title}</ProjectTitle>
                <ProjectDateRange theme={theme}>{project.dateRange}</ProjectDateRange>
                <ProjectDescription theme={theme} isExpanded={expandedProject === project.id}>
                  {project.description}
                </ProjectDescription>
              </ProjectHeaderContent>
              <ThumbnailContainer>
                <ProjectThumbnail src={project.thumbnail} alt={project.title} />
              </ThumbnailContainer>
            </ProjectHeader>
            <ProjectContent isExpanded={expandedProject === project.id}>
              {project.youtube && (
                <>
                  <ProjectVideo theme={theme}>
                    <iframe
                      src={`https://www.youtube.com/embed/${project.youtube}`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </ProjectVideo>
                  {project.id === 3 && (
                    <VideoNote theme={theme}>
                      (one of the 7-segment displays was a dud, that's why it's not on)
                    </VideoNote>
                  )}
                </>
              )}
              {project.images && project.images.length > 0 && (
                <ProjectImages>
                  {project.images.map((image, index) => (
                    <ImageContainer
                      key={index}
                      theme={theme}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleImageClick(image);
                      }}
                    >
                      <ProjectImage src={image.src} alt={image.caption} />
                    </ImageContainer>
                  ))}
                </ProjectImages>
              )}
              {project.links && (
                <ProjectLinks>
                  {project.links.map((link, index) => (
                    <ProjectLink
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      theme={theme}
                      onClick={(e) => e.stopPropagation()}
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
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ExpandedImage
                src={expandedImage.src}
                alt={expandedImage.caption}
                theme={theme}
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