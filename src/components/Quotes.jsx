import styled from '@emotion/styled'
import { motion } from 'framer-motion'

const QuotesSection = styled.section`
  padding: 4rem 0;
`

const QuotesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`

const QuoteCard = styled(motion.div)`
  background: ${props => props.theme === 'dark' ? '#2a2a2a' : '#f5f5f5'};
  padding: 2rem;
  border-radius: 8px;
  position: relative;
  
  &:before {
    content: '"';
    font-size: 4rem;
    position: absolute;
    top: -0.5rem;
    left: 0.5rem;
    color: ${props => props.theme === 'dark' ? '#444' : '#ddd'};
    font-family: Georgia, serif;
  }
`

const QuoteText = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  font-style: italic;
`

const QuoteAuthor = styled.p`
  color: ${props => props.theme === 'dark' ? '#888' : '#666'};
  font-size: 0.9rem;
`

const quotes = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    text: "Life is what happens while you're busy making other plans.",
    author: "John Lennon"
  },
  {
    text: "The journey of a thousand miles begins with one step.",
    author: "Lao Tzu"
  },
  // Add more quotes as needed
]

function Quotes({ theme }) {
  return (
    <QuotesSection>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Favorite Quotes
      </motion.h2>
      
      <QuotesGrid>
        {quotes.map((quote, index) => (
          <QuoteCard
            key={index}
            theme={theme}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <QuoteText>{quote.text}</QuoteText>
            <QuoteAuthor theme={theme}>— {quote.author}</QuoteAuthor>
          </QuoteCard>
        ))}
      </QuotesGrid>
    </QuotesSection>
  )
}

export default Quotes 