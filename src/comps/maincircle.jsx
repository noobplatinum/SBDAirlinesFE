import React, { useState, useEffect } from 'react';
import netlabLogo from '../assets/netleb.png';
import sbdLogo from '../assets/sbd-logo.png';
import dmjLogo from '../assets/dmj-logo.png';
import osLogo from '../assets/os-logo.png';
import Orbital from './orbital';

export default function MainCircle() {
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const baseCircleSize = 240;
  const getCircleSize = () => {
    if (screenSize >= 1920) return baseCircleSize * 1.5;
    if (screenSize >= 1536) return baseCircleSize * 1.3;
    if (screenSize >= 1280) return baseCircleSize * 1.15;
    return baseCircleSize;
  };
  
  const mainCircleSize = getCircleSize();
  const logoSize = mainCircleSize * 0.75;

  const orbitalImages = [dmjLogo, sbdLogo, osLogo];

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="mb-60 sm:mb-60 md:mb-68 lg:mb-72 xl:mb-76 2xl:mb-[400px] text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white text-center enable-scroll">
        <span className="text-white">Main Labs</span>
      </h1>
      
      <div className="relative mb-8">
        <div 
          className="rounded-full bg-gradient-to-r from-black to-blue-900 flex items-center justify-center shadow-xl glow"
          style={{ width: `${mainCircleSize}px`, height: `${mainCircleSize}px` }}
        >
          <div className="absolute inset-0 rounded-full bg-black bg-opacity-40 backdrop-blur-sm"></div>
          <div className="flex items-center justify-center z-10 rounded-full p-8">
            <img 
              src={netlabLogo} 
              alt="Logo" 
              className="rounded-full object-contain border-0 border-white border-opacity-20"
              style={{ width: `${logoSize}px`, height: `${logoSize}px` }}
            />
          </div>
          
          <Orbital mainCircleSize={mainCircleSize} orbitalImages={orbitalImages} />
        </div>
      </div>
    </div>
  );
}