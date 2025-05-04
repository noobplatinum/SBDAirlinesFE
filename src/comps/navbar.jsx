import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../themeContext';
import ThemeToggle from './themeToggle';

export default function Navbar() {
  const { darkMode } = useTheme();
  
  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 shadow-md ${
        darkMode ? 'bg-gray-900' : 'bg-white'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link 
            to="/" 
            className={`text-2xl font-bold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Netleb Notes
          </Link>
          
          <div className="flex items-center gap-8">
            <Link 
              to="/" 
              className={`font-medium ${
                darkMode ? 'text-white hover:text-blue-400' : 'text-gray-900 hover:text-blue-600'
              }`}
            >
              Home
            </Link>
            
            <Link 
              to="/login" 
              className={`font-medium ${
                darkMode ? 'text-white hover:text-blue-400' : 'text-gray-900 hover:text-blue-600'
              }`}
            >
              Login
            </Link>
            
            <Link 
              to="/notes" 
              className={`font-medium ${
                darkMode ? 'text-white hover:text-blue-400' : 'text-gray-900 hover:text-blue-600'
              }`}
            >
              Notes
            </Link>            
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}