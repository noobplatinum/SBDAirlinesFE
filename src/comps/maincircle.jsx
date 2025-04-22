import React, { useState, useEffect } from 'react';
import netlabLogo from '../assets/netleb.png';
import sbdLogo from '../assets/sbd-logo.png';
import dmjLogo from '../assets/dmj-logo.png';
import osLogo from '../assets/os-logo.png';
import Orbital from './orbital';
import { useTheme } from '../themeContext';

export default function MainCircle() {
  const { darkMode } = useTheme();
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Updated base size calculation with more significant reduction for small screens
  const getCircleSize = () => {
    if (screenSize >= 1920) return 360; // xl screens
    if (screenSize >= 1280) return 276; // lg screens
    if (screenSize >= 768) return 220;  // md screens
    if (screenSize >= 640) return 180;  // sm screens
    return 150;                         // xs screens - significantly smaller
  };
  
  const mainCircleSize = getCircleSize();
  const logoSize = mainCircleSize * 0.75;

  const orbitalImages = [dmjLogo, sbdLogo, osLogo];

  const titleColor = darkMode ? "text-white" : "text-slate-800";
  const circleGradient = darkMode 
    ? "bg-gradient-to-r from-black to-blue-900" 
    : "bg-gradient-to-r from-gray-100 to-blue-200";
  const backdropColor = darkMode 
    ? "bg-black bg-opacity-40" 
    : "bg-white bg-opacity-30";
  const glowEffect = darkMode 
    ? "shadow-lg shadow-blue-500/30" 
    : "shadow-lg shadow-blue-300/20";

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className={`mb-40 sm:mb-44 md:mb-52 lg:mb-60 xl:mb-72 text-3xl sm:text-4xl md:text-5xl font-bold ${titleColor} text-center enable-scroll transition-colors duration-300`}>
        <span>Main Labs</span>
      </h1>
      
      <div className="relative mb-8">
        <div 
          className={`rounded-full ${circleGradient} flex items-center justify-center ${glowEffect} transition-all duration-300`}
          style={{ width: `${mainCircleSize}px`, height: `${mainCircleSize}px` }}
        >
          <div className={`absolute inset-0 rounded-full ${backdropColor} backdrop-blur-sm transition-colors duration-300`}></div>
          <div className="flex items-center justify-center z-10 rounded-full p-4 sm:p-6 md:p-8">
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