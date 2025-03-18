import styled from '@emotion/styled'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

const QuotesSection = styled.section`
  padding: 4rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
`

const QuoteContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const QuoteCard = styled(motion.div)`
  background: ${props => props.theme === 'dark' ? '#2a2a2a' : '#f5f5f5'};
  padding: 3rem;
  border-radius: 8px;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 5px 40px rgba(0, 0, 0, 0.15);
`

const QuoteContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const QuoteText = styled.p`
  font-size: 1.8rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  font-style: italic;
  text-align: center;
`

const QuoteAuthor = styled.p`
  color: ${props => props.theme === 'dark' ? '#888' : '#666'};
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 2rem;
`

const NavButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme === 'dark' ? '#888' : '#666'};
  font-size: 1.2rem;
  cursor: pointer;
  position: absolute;
  bottom: 1.5rem;
  opacity: 0.6;
  transition: opacity 0.3s ease;
  padding: 0.5rem;
  
  &:hover {
    opacity: 1;
  }
  
  &:focus {
    outline: none;
  }
  
  &.left {
    left: 1.5rem;
  }
  
  &.right {
    right: 1.5rem;
  }
`

const quotes = [
  {
    text: "don't let the pursuit of success rob you of joy and playfulness",
    author: "unknown"
  },
  {
    text: "everything around you started as someone's impossible idea",
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
    text: "don't follow your passion, follow your talent",
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
    text: "don't take life too seriously, it's not like we are going to make it out alive",
    author: "elbert hubbard"
  },
  {
    text: "life is like chess\nwe can't undo a move, but we can make the next one better",
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const INTERVAL_DURATION = 8000; // 8 seconds per quote
  
  const nextQuote = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % quotes.length);
  }, []);
  
  const prevQuote = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + quotes.length) % quotes.length);
  }, []);
  
  useEffect(() => {
    if (isPaused) return;
    
    const autoChangeInterval = setInterval(() => {
      nextQuote();
    }, INTERVAL_DURATION);
    
    return () => clearInterval(autoChangeInterval);
  }, [isPaused, nextQuote]);
  
  return (
    <QuotesSection>
      <QuoteContainer 
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence mode="wait">
          <QuoteCard
            key={currentIndex}
            theme={theme}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <QuoteContent>
              <QuoteText>{quotes[currentIndex].text}</QuoteText>
              <QuoteAuthor theme={theme}>— {quotes[currentIndex].author}</QuoteAuthor>
            </QuoteContent>
            
            <NavButton 
              className="left" 
              onClick={prevQuote}
              theme={theme}
            >
              <FaArrowLeft />
            </NavButton>
            
            <NavButton 
              className="right" 
              onClick={nextQuote}
              theme={theme}
            >
              <FaArrowRight />
            </NavButton>
          </QuoteCard>
        </AnimatePresence>
      </QuoteContainer>
    </QuotesSection>
  )
}

export default Quotes 