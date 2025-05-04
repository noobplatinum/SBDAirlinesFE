import React, { useState, useEffect } from 'react';
import { useTheme } from '../themeContext';
import { Link } from 'react-router-dom';

export default function GeneralSection({ 
  title = "Netleb Notes", 
  subtitle = "Capture your thoughts, capture your flags!",
  showLoginButton = true
}) {
  const { darkMode } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };
  
  const notesBgColor = darkMode 
    ? "bg-gradient-to-br from-gray-900 to-indigo-900" 
    : "bg-gradient-to-br from-yellow-50 to-indigo-100";
  
  const textColor = darkMode ? "text-white" : "text-gray-800";
  const subtitleColor = darkMode ? "text-indigo-200/90" : "text-indigo-700/80";
  const shadowColor = darkMode ? "shadow-indigo-500/30" : "shadow-indigo-300/30";
  
  const noteCards = [
    { color: darkMode ? "bg-indigo-800" : "bg-indigo-100", rotation: "rotate-3" },
    { color: darkMode ? "bg-purple-800" : "bg-purple-100", rotation: "rotate-[-2deg]" },
    { color: darkMode ? "bg-blue-800" : "bg-blue-100", rotation: "rotate-[5deg]" },
  ];
  
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
            
            {showLoginButton && (
              <div className="mt-8 flex justify-center lg:justify-start">
                {!isLoggedIn ? (
                  <Link 
                    to="/login" 
                    className={`
                      px-8 py-3.5 rounded-full text-white font-semibold text-lg
                      transition-all duration-300 transform hover:scale-105 hover:shadow-xl
                      ${darkMode 
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800' 
                        : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700'
                      } 
                      focus:outline-none focus:ring-4 ${darkMode ? 'focus:ring-indigo-800' : 'focus:ring-indigo-300'}
                      shadow-lg flex items-center gap-2
                    `}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Start Note Taking
                  </Link>
                ) : (
                  <button 
                    onClick={handleLogout}
                    className={`
                      px-8 py-3.5 rounded-full text-white font-semibold text-lg
                      transition-all duration-300 transform hover:scale-105 hover:shadow-xl
                      ${darkMode 
                        ? 'bg-gradient-to-r from-red-600 to-pink-700 hover:from-red-700 hover:to-pink-800' 
                        : 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700'
                      } 
                      focus:outline-none focus:ring-4 ${darkMode ? 'focus:ring-red-800' : 'focus:ring-red-300'}
                      shadow-lg flex items-center gap-2
                    `}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                )}
              </div>
            )}
          </div>
          
          <div className="w-full lg:w-2/5 flex justify-center lg:justify-end">
            <div className="relative w-[18rem] h-[18rem] sm:w-[22rem] sm:h-[22rem] md:w-[24rem] md:h-[24rem]">
              {noteCards.map((card, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 rounded-lg ${card.color} shadow-xl ${shadowColor} ${card.rotation} 
                    transition-all duration-500 ease-in-out transform hover:scale-105
                    flex items-center justify-center p-6 text-left
                  `}
                  style={{
                    zIndex: 3 - index,
                    animation: `float${index + 1} 6s ease-in-out infinite`,
                    animationDelay: `${index * 0.5}s`
                  }}
                >
                  <div className={`${darkMode ? 'text-white/80' : 'text-gray-700'} w-full`}>
                    <div className="flex justify-between items-center mb-4">
                      <div className={`h-3 w-20 ${darkMode ? 'bg-indigo-500/30' : 'bg-indigo-500/20'} rounded-full`}></div>
                      <div className="flex space-x-1">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className={`h-2 w-2 rounded-full ${darkMode ? 'bg-white/30' : 'bg-gray-400/30'}`}></div>
                        ))}
                      </div>
                    </div>
                    <div className={`h-2 w-full ${darkMode ? 'bg-white/20' : 'bg-gray-400/20'} rounded-full mb-3`}></div>
                    <div className={`h-2 w-3/4 ${darkMode ? 'bg-white/20' : 'bg-gray-400/20'} rounded-full mb-3`}></div>
                    <div className={`h-2 w-5/6 ${darkMode ? 'bg-white/20' : 'bg-gray-400/20'} rounded-full mb-3`}></div>
                    <div className={`h-2 w-2/3 ${darkMode ? 'bg-white/20' : 'bg-gray-400/20'} rounded-full mb-3`}></div>
                    <div className={`h-2 w-3/5 ${darkMode ? 'bg-white/20' : 'bg-gray-400/20'} rounded-full mb-3`}></div>
                    <div className={`h-6 w-8 ${darkMode ? 'bg-indigo-500/40' : 'bg-indigo-500/30'} rounded mt-6`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes float1 {
          0%, 100% { transform: translateY(0) rotate(3deg); }
          50% { transform: translateY(-10px) rotate(3deg); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-14px) rotate(-2deg); }
        }
        @keyframes float3 {
          0%, 100% { transform: translateY(0) rotate(5deg); }
          50% { transform: translateY(-8px) rotate(5deg); }
        }
      `}</style>
    </section>
  );
}