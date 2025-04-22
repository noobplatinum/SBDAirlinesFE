import React from 'react';

export default function GeneralSection({ 
  title = "Stellar Solutions", 
  subtitle = "Crafting digital experiences that are out of this world",
  circleColor = "bg-gradient-to-br from-blue-600 to-purple-700" 
}) {
  return (
    <section className="w-full min-h-screen py-16 flex items-center">
      <div className="container mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between">
        {/* Left side - Large text and subtitle */}
        <div className="lg:w-3/5 text-left mb-12 lg:mb-0">
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-blue-200/80 mt-8 max-w-2xl">
            {subtitle}
          </p>
          
          {/* Optional button */}
          <button className="mt-10 px-8 py-4 bg-blue-600/80 hover:bg-blue-500 text-white rounded-full text-lg transition-colors duration-300 backdrop-blur-sm">
            Explore More
          </button>
        </div>
        
        {/* Right side - Large circle */}
        <div className="lg:w-2/5 relative flex justify-center lg:justify-end">
          <div className={`w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full ${circleColor} shadow-2xl shadow-blue-500/30 relative overflow-hidden`}>
            {/* Inner circle decoration */}
            <div className="absolute inset-8 rounded-full bg-white/10 backdrop-blur-md"></div>
            
            {/* Animated glow effect */}
            <div className="absolute inset-0 opacity-50 animate-pulse">
              <div className="absolute inset-6 rounded-full bg-blue-400/20 backdrop-blur-sm"></div>
            </div>
            
            {/* Optional icon or symbol in the middle */}
            <div className="absolute inset-0 flex items-center justify-center text-6xl text-white/90">
              ✨
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}