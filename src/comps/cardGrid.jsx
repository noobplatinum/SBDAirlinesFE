import React from 'react';
import Card from './cards';
import { cardData } from './cardData';
import { useTheme } from '../themeContext';

export default function CardGrid() {
  const { darkMode } = useTheme();

  return (
    <>
      <div className="mb-16 text-center">
        <div className="inline-block">
          <div className="flex justify-center mb-4">
            <div className={`h-1 w-24 rounded-full ${darkMode ? 'bg-blue-500' : 'bg-blue-600'}`}></div>
          </div>
          
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 relative ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Featured Articles
            <span className="absolute -left-3 -top-3 w-10 h-10 rounded-full opacity-20 bg-blue-500 -z-10 hidden md:block"></span>
          </h1>
        </div>
        
        <p className={`text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Baca <span className="text-blue-500 font-medium">berita-berita terkini</span> dari perangkat Anda! 
          SBD News menyajikan informasi cepat dan terpercaya.
        </p>
        
        <div className="flex justify-center mb-12">
          <div className="flex space-x-2">
            <span className={`inline-block w-2 h-2 rounded-full ${darkMode ? 'bg-blue-500' : 'bg-blue-600'}`}></span>
            <span className={`inline-block w-2 h-2 rounded-full ${darkMode ? 'bg-blue-500' : 'bg-blue-600'}`}></span>
            <span className={`inline-block w-2 h-2 rounded-full ${darkMode ? 'bg-blue-500' : 'bg-blue-600'}`}></span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cardData.results.map((item, index) => (
          <div 
            key={item.id}
            className="transform transition-all duration-300 hover:scale-105"
            style={{
              animationDelay: `${index * 150}ms`,
              opacity: 0,
              animation: 'fadeInUp 0.6s ease-out forwards',
              animationDelay: `${index * 150}ms`
            }}
          >
            <Card 
              title={item.title}
              body={item.body}
              image={`${item.image}?random=${item.id}`}
            />
          </div>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}