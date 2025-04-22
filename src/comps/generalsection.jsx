import React from 'react';
import netlabLogo from '../assets/netleb.png'; // Import the Netlab logo

export default function GeneralSection({ 
  title = "Stellar Solutions", 
  subtitle = "Crafting digital experiences that are out of this world",
  circleColor = "bg-gradient-to-br from-black to-blue-900", // Updated default gradient
  image = netlabLogo
}) {
  return (
    <section className="w-full min-h-screen py-16 flex items-center">
      <div className="container mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between">
        <div className="lg:w-3/5 text-center lg:text-left mb-12 lg:mb-0">
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-blue-200/80 mt-8 max-w-2xl mx-auto lg:mx-0">
            {subtitle}
          </p>

        </div>
        
        <div className="lg:w-2/5 relative flex justify-center lg:justify-end">
          <div className={`w-[22rem] h-[22rem] md:w-[28rem] md:h-[28rem] lg:w-[34rem] lg:h-[34rem] xl:w-[38rem] xl:h-[38rem] rounded-full ${circleColor} shadow-2xl shadow-blue-500/30 relative overflow-hidden`}>
            <div className="absolute inset-10 md:inset-12 lg:inset-14 xl:inset-16 rounded-full bg-black/10 backdrop-blur-md"></div>
            
            <div className="absolute inset-0 opacity-50 animate-pulse">
              <div className="absolute inset-8 md:inset-10 lg:inset-12 xl:inset-14 rounded-full bg-blue-400/20 backdrop-blur-sm"></div>
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[70%] h-[70%] flex items-center justify-center p-4">
                <img 
                  src={image} 
                  alt="Netlab Logo" 
                  className="max-w-[90%] max-h-[90%] object-contain rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}