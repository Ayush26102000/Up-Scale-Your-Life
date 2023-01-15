import React, { useState, useEffect } from 'react';

const quotes = [
  {
    quote: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela"
  },
  {
    quote: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney"
  },
  {
    quote: "Your work is going to fill a large part of your life.",
    author: "Steve Jobs"
  }
];

function QuoteCard() {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCurrentQuote(quotes[randomIndex]);
    }, 60000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="card">
      <p className="quote">{currentQuote.quote}</p>
      <p className="author">- {currentQuote.author}</p>
    </div>
  );
}

export default QuoteCard;
