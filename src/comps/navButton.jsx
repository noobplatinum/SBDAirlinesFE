import React from 'react';
import { useTheme } from '../themeContext';

export default function NavigationButtons() {
  const { darkMode } = useTheme();
  
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`
      fixed top-20 sm:top-24 md:top-36 lg:top-48 xl:top-52 2xl:top-60
      right-4 sm:right-6 md:right-8 lg:right-12 z-40
      flex flex-row gap-3 sm:gap-4 md:gap-5
      backdrop-blur-0
      p-2 rounded-full
      transition-all duration-300
    `}>
      <button
        onClick={() => scrollToSection('overview')}
        className={`
          px-3 py-1.5 sm:px-4 sm:py-2
          text-xs sm:text-sm md:text-base
          font-medium rounded-full
          ${darkMode 
            ? 'text-white hover:text-blue-100 bg-slate-900/50 hover:bg-slate-800/70 border-slate-800' 
            : 'text-gray-900 hover:text-blue-900 bg-gray-100/50 hover:bg-white/70 border-gray-200'
          }
          transition-all duration-200
          shadow hover:shadow-md
          border ${darkMode ? 'hover:border-blue-400' : 'hover:border-blue-500'}
          transform hover:-translate-y-0.5
        `}
      >
        Overview
      </button>
      <button
        onClick={() => scrollToSection('labs')}
        className={`
          px-3 py-1.5 sm:px-4 sm:py-2
          text-xs sm:text-sm md:text-base
          font-medium rounded-full
          ${darkMode 
            ? 'text-white hover:text-blue-100 bg-slate-900/50 hover:bg-slate-800/70 border-slate-800' 
            : 'text-gray-900 hover:text-blue-900 bg-gray-100/50 hover:bg-white/70 border-gray-200'
          }
          transition-all duration-200
          shadow hover:shadow-md
          border ${darkMode ? 'hover:border-blue-400' : 'hover:border-blue-500'}
          transform hover:-translate-y-0.5
        `}
      >
        Labs
      </button>
      <button
        onClick={() => scrollToSection('praktikum')}
        className={`
          px-3 py-1.5 sm:px-4 sm:py-2
          text-xs sm:text-sm md:text-base
          font-medium rounded-full
          ${darkMode 
            ? 'text-white hover:text-blue-100 bg-slate-900/50 hover:bg-slate-800/70 border-slate-800' 
            : 'text-gray-900 hover:text-blue-900 bg-gray-100/50 hover:bg-white/70 border-gray-200'
          }
          transition-all duration-200
          shadow hover:shadow-md
          border ${darkMode ? 'hover:border-blue-400' : 'hover:border-blue-500'}
          transform hover:-translate-y-0.5
        `}
      >
        Praktikum
      </button>
    </div>
  );
}