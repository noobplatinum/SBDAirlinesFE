import React, { useState, useEffect } from 'react';
import './orbital.css';

export default function Orbital({ mainCircleSize = 320 }) {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    // Delay the appearance of the orbiting circles
    const timer = setTimeout(() => {
      setVisible(true);
    }, 2000); // Wait 2 seconds before showing orbiting circles
    
    return () => clearTimeout(timer);
  }, []);
  
  // Make subcircles 50% of main circle size (30% smaller than before)
  const subcircleSize = mainCircleSize * 0.7; 
  
  return (
    <div className="orbital-container">
      {/* Orbiting subcircles */}
      {visible && (
        <>
          <div 
            className={`subcircle ${visible ? 'visible' : ''}`}
            style={{
              width: subcircleSize,
              height: subcircleSize,
            }}
          >
            <span className="subcircle-icon">✨</span>
          </div>
          
          <div 
            className={`subcircle ${visible ? 'visible' : ''}`}
            style={{
              width: subcircleSize,
              height: subcircleSize,
              animationDelay: '0s',
              animationDuration: '40s',
              transform: 'rotate(120deg)'
            }}
          >
            <span className="subcircle-icon">🚀</span>
          </div>
          
          <div 
            className={`subcircle ${visible ? 'visible' : ''}`}
            style={{
              width: subcircleSize,
              height: subcircleSize,
              animationDelay: '0s',
              animationDuration: '40s',
              transform: 'rotate(240deg)'
            }}
          >
            <span className="subcircle-icon">💻</span>
          </div>
        </>
      )}
    </div>
  );
}