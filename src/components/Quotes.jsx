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
    text: "don’t let the pursuit of success rob you of joy and playfulness",
    author: "unknown"
  },
  {
    text: "everything around you started as someone’s impossible idea",
    author: "unknown"
  },
  {
    text: "comparison is the thief of joy",
    author: "theodore roosevelt"
  },
  {
    text: "keep your eyes on the stars and your feet on the ground",
    author: "theodore roosevelt"
  },
  {
    text: "a society grows great when old men plant trees in whose shade they shall never sit",
    author: "greek proverb"
  },
  {
    text: "don’t follow your passion, follow your talent",
    author: "scott galloway"
  },
  {
    text: "heaven is on earth",
    author: "unknown"
  },
  {
    text: "hakuna matata, there are no troubles",
    author: "the lion king"
  },
  {
    text: "i'm not afraid of dying, i'm afraid I haven't been alive enough",
    author: "jaco van dormael"
  },
  {
    text: "don’t take life too seriously, it’s not like we are going to make it out alive",
    author: "elbert hubbard"
  },
  {
    text: "life is like chess\nwe can’t undo a move, but we can make the next one better",
    author: "unknown"
  },
  {
    text: "to get to die means you get to live",
    author: "neil degrasse tyson"
  },
  {
    text: "life happens wherever you are, whether you make it or not",
    author: "uncle iroh"
  }
];


function Quotes({ theme }) {
  return (
    <QuotesSection>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        favorite quotes
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