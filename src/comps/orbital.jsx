import React, { useState, useEffect } from 'react';
import './orbital.css';
import { useTheme } from '../themeContext';

export default function Orbital({ mainCircleSize = 320, orbitalImages = [] }) {
  const { darkMode } = useTheme();
  const [visible, setVisible] = useState(false);
  const [viewportSize, setViewportSize] = useState(window.innerWidth);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 0); 
    
    const handleResize = () => {
      setViewportSize(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const getOrbitMultiplier = () => {
    if (viewportSize >= 1536) return 0.9;      
    if (viewportSize >= 1280) return 0.85;    
    if (viewportSize >= 768) return 0.8;      
    if (viewportSize >= 640) return 0.75;     
    return 0.7;                                
  };
  
  const getSubcircleMultiplier = () => {
    if (viewportSize >= 1536) return 0.6;      
    if (viewportSize >= 1280) return 0.55;    
    if (viewportSize >= 768) return 0.5;      
    if (viewportSize >= 640) return 0.45;     
    return 0.4;                               
  };
  
  const orbitalGradients = [
    darkMode 
      ? 'linear-gradient(to bottom, rgb(219, 39, 119), rgb(16, 185, 129))' 
      : 'linear-gradient(to bottom, rgb(244, 114, 182), rgb(74, 222, 128))',
      
    darkMode 
      ? 'linear-gradient(to bottom, rgb(234, 88, 12), rgb(4, 120, 87))' 
      : 'linear-gradient(to bottom, rgb(253, 186, 116), rgb(13, 148, 136))',
      
    darkMode 
      ? 'linear-gradient(to bottom, rgb(91, 33, 182), rgb(202, 138, 4))' 
      : 'linear-gradient(to bottom, rgb(124, 58, 237), rgb(251, 191, 36))'
  ];
  
  const subcircleSize = mainCircleSize * getSubcircleMultiplier();
  const orbitRadius = mainCircleSize * getOrbitMultiplier();
  
  const orbitalShadow = darkMode
    ? '0 0 15px rgba(59, 130, 246, 0.7)' 
    : '0 0 15px rgba(59, 130, 246, 0.4)';

  return (
    <div className="orbital-container">
      {visible && (
        <>
          <div 
            className="subcircle visible"
            style={{
              width: subcircleSize,
              height: subcircleSize,
              fontSize: `${subcircleSize * 0.2}px`,
              '--orbit-radius': `${orbitRadius}px`,
              background: orbitalGradients[0],
              boxShadow: orbitalShadow,
              transition: 'background 0.3s ease, box-shadow 0.3s ease'
            }}
          >
            {orbitalImages[0] ? (
              <div className="w-full h-full p-2 sm:p-4 md:p-6 lg:p-8 flex items-center justify-center">
                <img 
                  src={orbitalImages[0]} 
                  alt="Orbital 1" 
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
            ) : (
              <span className="subcircle-icon">{defaultIcons[0]}</span>
            )}
          </div>
          
          <div 
            className="subcircle visible"
            style={{
              width: subcircleSize,
              height: subcircleSize,
              animationDelay: '0s',
              animationDuration: '40s',
              transform: 'rotate(120deg)',
              fontSize: `${subcircleSize * 0.2}px`,
              '--orbit-radius': `${orbitRadius}px`,
              background: orbitalGradients[1],
              boxShadow: orbitalShadow,
              transition: 'background 0.3s ease, box-shadow 0.3s ease'
            }}
          >
            {orbitalImages[1] ? (
              <div className="w-full h-full p-2 sm:p-4 md:p-6 lg:p-8 flex items-center justify-center">
                <img 
                  src={orbitalImages[1]} 
                  alt="Orbital 2" 
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
            ) : (
              <span className="subcircle-icon">{defaultIcons[1]}</span>
            )}
          </div>
          
          <div 
            className="subcircle visible"
            style={{
              width: subcircleSize,
              height: subcircleSize,
              animationDelay: '0s',
              animationDuration: '40s',
              transform: 'rotate(240deg)',
              fontSize: `${subcircleSize * 0.2}px`,
              '--orbit-radius': `${orbitRadius}px`,
              background: orbitalGradients[2],
              boxShadow: orbitalShadow,
              transition: 'background 0.3s ease, box-shadow 0.3s ease'
            }}
          >
            {orbitalImages[2] ? (
              <div className="w-full h-full p-2 sm:p-4 md:p-6 lg:p-8 flex items-center justify-center">
                <img 
                  src={orbitalImages[2]} 
                  alt="Orbital 3" 
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
            ) : (
              <span className="subcircle-icon">{defaultIcons[2]}</span>
            )}
          </div>
        </>
      )}
    </div>
  );
}