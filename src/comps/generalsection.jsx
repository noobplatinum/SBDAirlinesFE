import React from 'react';
import netlabLogo from '../assets/netleb.png';
import { useTheme } from '../themeContext';

export default function GeneralSection({ 
  title = "Nil", 
  subtitle = "Nil",
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
    <section className="w-full min-h-screen pt-36 sm:pt-32 md:pt-28 lg:py-16 flex items-center transition-colors duration-300 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4">
          <div className="w-full lg:w-3/5 text-center lg:text-left mb-8 lg:mb-0">
          <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black sm:font-extrabold lg:font-bold ${textColor} leading-tight transition-colors duration-300`}>
            {title}
          </h1>
          <p className={`text-lg sm:text-xl md:text-2xl font-medium sm:font-normal ${subtitleColor} mt-6 md:mt-8 max-w-2xl mx-auto lg:mx-0 transition-colors duration-300`}>
            {subtitle}
          </p>
          </div>
          
          <div className="w-full lg:w-2/5 flex justify-center lg:justify-end">
            <div className="relative aspect-square w-[16rem] sm:w-[18rem] md:w-[22rem] lg:w-[26rem] xl:w-[32rem]">
              <div className={`absolute inset-0 rounded-full ${circleColor} shadow-2xl ${shadowColor} overflow-hidden transition-all duration-300`}>
                <div className={`absolute top-[10%] right-[10%] bottom-[10%] left-[10%] rounded-full ${innerCircleBg} backdrop-blur-md transition-colors duration-300`}></div>
                
                <div className="absolute inset-0 opacity-50 animate-pulse">
                  <div className={`absolute top-[8%] right-[8%] bottom-[8%] left-[8%] rounded-full ${pulseCircleBg} backdrop-blur-sm transition-colors duration-300`}></div>
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
        </div>
      </div>
    </section>
  );
}