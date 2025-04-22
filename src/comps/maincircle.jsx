import React from 'react';
import logopath from '../assets/netleb.jpg'; // Using the same logo from header
import Orbital from './orbital'; // Add this import

export default function MainCircle() {
  const mainCircleSize = 240; // Define size for consistency

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative mb-8">
        <div 
          className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-xl glow"
          style={{ width: `${mainCircleSize}px`, height: `${mainCircleSize}px` }}
        >
          <div className="absolute inset-0 rounded-full bg-black bg-opacity-40 backdrop-blur-sm"></div>
          <img 
            src={logopath} 
            alt="Logo" 
            className="w-48 h-48 rounded-full z-10 object-cover border-4 border-white border-opacity-20" 
          />
          
          {/* Add the Orbital component here */}
          <Orbital mainCircleSize={mainCircleSize} />
        </div>
      </div>
      
      {/* Title and Subtitle */}
      <h1 className="text-4xl font-bold text-white mb-4 text-center">
        <span className="text-blue-400">hendy </span>
        <span className="text-white">skizo</span>
      </h1>
      <p className="text-xl text-gray-300 max-w-lg text-center">
        fix netleb tunduk junior
      </p>
    </div>
  );
}