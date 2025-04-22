import { useEffect } from 'react';
import { useTheme } from '../themeContext';
import './shootingStars.css';

export default function ShootingStars() {
  const { darkMode } = useTheme();
  
  return (
    <div className="shooting-stars-container">
      <div className={`background dark-mode ${darkMode ? 'visible' : 'hidden'}`}></div>
      <div className={`background light-mode ${darkMode ? 'hidden' : 'visible'}`}></div>
      <div className="night">
        {[...Array(30)].map((_, i) => {
          const computedTop = getComputedTopPosition(i);
          const shiftedTop = computedTop + 20;
          
          return (
            <div 
              key={i} 
              className={`shooting_star ${darkMode ? 'dark-star' : 'light-star'}`} 
              style={{ top: `${shiftedTop}%` }}
            ></div>
          );
        })}
      </div>
    </div>
  );
}

function getComputedTopPosition(index) {
  const topPositions = [
    5, 8, 3, 10, 7, 12, 6, 15, 9, 4,
    20, 18, 22, 24, 26, 30, 32, 36, 34, 38,
    42, 45, 48, 44, 46, 52, 56, 54, 58, 60
  ];
  
  return topPositions[index] || 0;
}