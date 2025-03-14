import styled from '@emotion/styled'
import { motion } from 'framer-motion'

const ProjectsSection = styled.section`
  padding: 4rem 0;
`

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`

const ProjectCard = styled(motion.div)`
  background: ${props => props.theme === 'dark' ? '#2a2a2a' : '#f5f5f5'};
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`

const ProjectImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`

const ProjectContent = styled.div`
  padding: 1.5rem;
`

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`

const ProjectDescription = styled.p`
  color: ${props => props.theme === 'dark' ? '#888' : '#666'};
  margin-bottom: 1rem;
`

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
`

const ProjectLink = styled.a`
  color: ${props => props.theme === 'dark' ? '#fff' : '#000'};
  text-decoration: underline;
  font-size: 0.9rem;
  
  &:hover {
    opacity: 0.8;
  }
`

const projects = [
  {
    title: "Project 1",
    description: "Description of your first project. Explain what it does and what technologies you used.",
    image: "https://via.placeholder.com/400x200",
    github: "https://github.com/yourusername/project1",
    demo: "https://project1-demo.com"
  },
  {
    title: "Project 2",
    description: "Description of your second project. Explain what it does and what technologies you used.",
    image: "https://via.placeholder.com/400x200",
    github: "https://github.com/yourusername/project2",
    demo: "https://project2-demo.com"
  },
  // Add more projects as needed
]

function Projects({ theme }) {
  return (
    <ProjectsSection>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Projects
      </motion.h2>
      
      <ProjectsGrid>
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            theme={theme}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <ProjectImage src={project.image} alt={project.title} />
            <ProjectContent>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectDescription theme={theme}>
                {project.description}
              </ProjectDescription>
              <ProjectLinks>
                <ProjectLink href={project.github} target="_blank" rel="noopener noreferrer" theme={theme}>
                  GitHub
                </ProjectLink>
                <ProjectLink href={project.demo} target="_blank" rel="noopener noreferrer" theme={theme}>
                  Live Demo
                </ProjectLink>
              </ProjectLinks>
            </ProjectContent>
          </ProjectCard>
        ))}
      </ProjectsGrid>
    </ProjectsSection>
  )
}

export default Projects 