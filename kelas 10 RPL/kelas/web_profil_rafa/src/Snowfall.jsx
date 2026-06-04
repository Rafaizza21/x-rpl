import React from 'react';
import './Snowfall.css';

const Snowfall = () => {
  // Membuat 40 butiran salju
  const snowflakes = Array.from({ length: 40 }).map((_, i) => {
    const left = `${Math.random() * 100}%`;
    const animationDuration = `${Math.random() * 6 + 6}s`; // 6s - 12s duration
    const animationDelay = `-${Math.random() * 12}s`; // randomize start time
    const opacity = Math.random() * 0.6 + 0.2; // 0.2 - 0.8 opacity
    const size = `${Math.random() * 4 + 2}px`; // 2px - 6px size
    
    return (
      <div 
        key={i} 
        className="snowflake" 
        style={{
          left,
          animationDuration,
          animationDelay,
          opacity,
          width: size,
          height: size
        }}
      />
    );
  });

  return (
    <div className="snow-container" aria-hidden="true">
      {snowflakes}
    </div>
  );
};

export default Snowfall;
