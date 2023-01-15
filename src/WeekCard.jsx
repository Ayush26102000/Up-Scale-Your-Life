import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './WeekCard.css';

const WeekCard1 = () => {
  const [currentWeek, setCurrentWeek] = useState([]);
  const [currentWeekStart, setCurrentWeekStart] = useState(moment().startOf('week'));

  useEffect(() => {
    const week = [];
    for (let i = 0; i < 7; i++) {
      week.push(moment(currentWeekStart).add(i, 'days'));
    }
    setCurrentWeek(week);
  }, [currentWeekStart]);

  const handlePreviousClick = () => {
    setCurrentWeekStart(moment(currentWeekStart).subtract(1, 'week'));
  };

  const handleNextClick = () => {
    setCurrentWeekStart(moment(currentWeekStart).add(1, 'week'));
  };

  return (
    <div className="week-card">
      <h2 style={{ paddingBottom: '1rem', color: 'rgb(255, 124, 0)' }}>Current Week</h2>
      <div style={{ paddingBottom: '1rem' }}> <button className='buttonw' onClick={handlePreviousClick}>Previous</button>
        <button className='buttonw' onClick={handleNextClick}>Next</button></div>

      <ul>
        {currentWeek.map((day, index) => (
          <li key={index}>{day.format('dddd, MMMM Do')}</li>
        ))}
      </ul>
    </div>
  );
};

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
    quote: "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do.",
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
      <h2 style={{ margin: '0', paddingBottom: '1rem', color: 'rgb(255, 124, 0)' }}>Read this to feel motivated for the week</h2>
      <p className="quote">{currentQuote.quote}</p>
      <p className="author" style={{ color: 'rgb(255, 124, 0)', paddingTop: '.5rem' }}>- {currentQuote.author}</p>
    </div>
  );
}


function WeekCard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <WeekCard1 />
      <QuoteCard />
    </div>
  );
}

export default WeekCard;
