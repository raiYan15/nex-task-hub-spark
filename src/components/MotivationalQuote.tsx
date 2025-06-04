
import React, { useState, useEffect } from 'react';

interface MotivationalQuoteProps {
  darkMode: boolean;
}

const MotivationalQuote = ({ darkMode }: MotivationalQuoteProps) => {
  const quotes = [
    "The way to get started is to quit talking and begin doing. - Walt Disney",
    "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
    "A goal is a dream with a deadline. - Napoleon Hill",
    "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
    "The future depends on what you do today. - Mahatma Gandhi",
    "You don't have to be great to get started, but you have to get started to be great. - Les Brown"
  ];

  const [currentQuote, setCurrentQuote] = useState(quotes[0]);

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setCurrentQuote(randomQuote);
  }, []);

  return (
    <p className={`text-lg mb-8 italic transition-all duration-300 ${
      darkMode ? 'text-gray-300' : 'text-gray-700'
    }`}>
      "{currentQuote}"
    </p>
  );
};

export default MotivationalQuote;
