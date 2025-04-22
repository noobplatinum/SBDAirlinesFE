import React from 'react';
import { useTheme } from '../themeContext';

export default function Footer() {
  const { darkMode } = useTheme();
  
  return (
    <footer className={`
      w-full py-4 sm:py-6 md:py-8 mt-8 sm:mt-10 md:mt-12 backdrop-blur-md transition-all duration-300 
      ${darkMode 
        ? "bg-slate-900/85 border-t border-blue-500/30" 
        : "bg-white/85 border-t border-blue-300/30"}
    `}>
      <div className="min-w-full mx-auto flex justify-between items-center px-4 sm:px-5 md:px-6 lg:px-8">
        <div className="flex space-x-2 sm:space-x-4 md:space-x-6">
          <i className={`text-xs sm:text-sm md:text-base transition-colors duration-300 ${darkMode ? "text-white/70" : "text-slate-700"}`}>
            April 2025, David
          </i>
        </div>
        
        <div className="text-right">
          <h3 className={`text-lg sm:text-l md:text-2xl mb-1 sm:mb-1.5 md:mb-2 transition-colors duration-300 ${darkMode ? "text-white/90" : "text-slate-800"}`}>
            Network Laboratory
          </h3>
          <p className={`text-xs sm:text-sm md:text-base transition-colors duration-300 ${darkMode ? "text-white/60" : "text-slate-600"}`}>
            #ConnectingUs
          </p>
        </div>
      </div>
    </footer>
  );
}