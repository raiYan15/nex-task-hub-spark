
import React, { useState, useEffect } from 'react';

const TypewriterTitle = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = "Welcome to NexTask 🧠";
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  return (
    <h1 className="text-4xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
      {displayText}
      <span className="animate-pulse">|</span>
    </h1>
  );
};

export default TypewriterTitle;
