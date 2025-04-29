import React, { useState } from 'react';
import ThemeToggle from './themeToggle';
import { useTheme } from '../themeContext';

export default function Navbar() {
  const { darkMode } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <nav className={`fixed top-0 w-full z-10 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} shadow-lg transition-colors duration-300`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <div className="font-bold text-2xl">SBD News</div>
          
          <div className="flex space-x-12">
          <a href="#" className={`text-lg hover:text-blue-500 transition-colors duration-300 font-medium ${!darkMode ? 'text-gray-800' : 'text-gray-200'}`}>
              Home
            </a>
            <a href="#" className={`text-lg hover:text-blue-500 transition-colors duration-300 font-medium ${!darkMode ? 'text-gray-800' : 'text-gray-200'}`}>
              Profile
            </a>
            <a href="#" className={`text-lg hover:text-blue-500 transition-colors duration-300 font-medium ${!darkMode ? 'text-gray-800' : 'text-gray-200'}`}>
              Contact
            </a>
          </div>
          
          <div className="md:hidden">
            <button 
              onClick={() => setMenuOpen(!menuOpen)} 
              className={`flex items-center px-3 py-2 border rounded ${darkMode ? 
                'border-gray-600 text-gray-300 hover:bg-gray-800' : 
                'border-gray-300 text-gray-700 hover:bg-gray-100'
              } transition-colors duration-200`}
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path 
                  fillRule="evenodd" 
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" 
                  clipRule="evenodd" 
                />
              </svg>
            </button>
          </div>
          
          <div className="flex items-center">            
            <ThemeToggle />
          </div>
        </div>

        {menuOpen && (
          <div className={`md:hidden py-4 px-2 ${darkMode ? 
            'bg-gray-800 border-gray-700' : 
            'bg-white border-gray-200'
          } rounded-lg shadow-lg mb-4 border-t transition-all duration-300`}>
            <a href="#" className="flex items-center py-3 px-4 text-lg hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors duration-200 mb-1">
              <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </a>
            <a href="#" className="flex items-center py-3 px-4 text-lg hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors duration-200 mb-1">
              <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profile
            </a>
            <a href="#" className="flex items-center py-3 px-4 text-lg hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors duration-200">
              <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact
            </a>
            <div className="mt-3 ml-4">
              <ThemeToggle />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}