import React from 'react';
import netlabLogo from '../assets/netleb.png';
import { useTheme } from '../themeContext';

export default function GeneralSection({ 
  title = "Stellar Solutions", 
  subtitle = "Crafting digital experiences that are out of this world",
  image = netlabLogo
}) {
  const { darkMode } = useTheme();
  
  const circleColor = darkMode 
    ? "bg-gradient-to-br from-black to-blue-900" 
    : "bg-gradient-to-br from-gray-100 to-blue-200";
  
  const textColor = darkMode ? "text-white" : "text-slate-800";
  const subtitleColor = darkMode ? "text-blue-200/80" : "text-blue-700/80";
  const shadowColor = darkMode ? "shadow-blue-500/30" : "shadow-blue-300/30";
  const innerCircleBg = darkMode ? "bg-black/10" : "bg-white/30";
  const pulseCircleBg = darkMode ? "bg-blue-400/20" : "bg-blue-300/20";
  
  return (
    <section className={`w-full min-h-screen py-16 flex items-center transition-colors duration-300 bg-transparent`}>
      <div className="container mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between">
        <div className="lg:w-3/5 text-center lg:text-left mb-12 lg:mb-0">
          <h1 className={`text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold ${textColor} leading-tight transition-colors duration-300`}>
            {title}
          </h1>
          <p className={`text-xl md:text-2xl ${subtitleColor} mt-8 max-w-2xl mx-auto lg:mx-0 transition-colors duration-300`}>
            {subtitle}
          </p>
        </div>
        
        <div className="lg:w-2/5 relative flex justify-center lg:justify-end">
          <div className={`w-[22rem] h-[22rem] md:w-[28rem] md:h-[28rem] lg:w-[34rem] lg:h-[34rem] xl:w-[38rem] xl:h-[38rem] rounded-full ${circleColor} shadow-2xl ${shadowColor} relative overflow-hidden transition-all duration-300`}>
            <div className={`absolute inset-10 md:inset-12 lg:inset-14 xl:inset-16 rounded-full ${innerCircleBg} backdrop-blur-md transition-colors duration-300`}></div>
            
            <div className="absolute inset-0 opacity-50 animate-pulse">
              <div className={`absolute inset-8 md:inset-10 lg:inset-12 xl:inset-14 rounded-full ${pulseCircleBg} backdrop-blur-sm transition-colors duration-300`}></div>
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[70%] h-[70%] flex items-center justify-center p-4">
                <img 
                  src={image} 
                  alt="Netlab Logo" 
                  className="max-w-[90%] max-h-[90%] object-contain rounded-full transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
}