import React, { useState, useEffect } from 'react';
import { useTheme } from '../themeContext';
import { Star, RotateCcw } from 'lucide-react';
import './starCollector.css';

export default function StarCollector() {
    const { darkMode } = useTheme();
    const [starCount, setStarCount] = useState(0);
    const [stars, setStars] = useState([]);
    const [milestone, setMilestone] = useState(false); // Daftar UseState
    // UseState berguna untuk menyimpan data yang dapat berubah seiring waktu, seperti boolean

    // Generate star pada posisi random
    const generateStar = () => {
        const newStar = {
            id: Date.now(),
            top: Math.random() * 85 + 5,
            left: Math.random() * 85 + 5,
            size: Math.random() * 8 + 6,
            delay: Math.random() * 1,
        };

        setStars(prevStars => [...prevStars, newStar]);

        // Hapus star setelah 4 detik
        setTimeout(() => {
            setStars(prevStars => prevStars.filter(star => star.id !== newStar.id));
        }, 4000);
    };

    // Klik untuk mendapatkan star
    const collectStar = (id) => {
        setStars(prevStars => prevStars.filter(star => star.id !== id));
        setStarCount(prevCount => prevCount + 1);
    };

    // UseEffect untuk generate star, bekerja bersama useState 
    useEffect(() => {
        const interval = setInterval(() => {
            if (stars.length < 8) {
                generateStar();
            }
        }, 800);

        return () => clearInterval(interval);
    }, [stars]);

    // Achievement per 5 star
    useEffect(() => {
        if (starCount > 0 && starCount % 5 === 0) {
            setMilestone(true);

            setTimeout(() => {
                alert(`✨ Nice! Anda telah mendapatkan ${starCount} stars! ✨`);
                setMilestone(false);
            }, 300);
        }
    }, [starCount]);

    return ( // Styling
        <div className={`star-collector-container ${darkMode ? 'dark' : 'light'}`}>
            <div className="star-collector-header">
                <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Star Collector
                </h2>
                <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Klik stars yang muncul! Alert akan muncul per 5 stars yang didapat.
                </p>
            </div>

            <div className="star-count-display">
                <div className={`star-count ${milestone ? 'pulse' : ''} ${darkMode ? 'dark-counter' : 'light-counter'}`}>
                    <Star className="star-icon" size={20} />
                    <span className="count">{starCount}</span>
                </div>

                <button
                    onClick={() => setStarCount(0)}
                    className={`reset-button ${darkMode ?
                        'bg-gray-700 hover:bg-gray-600 text-white' :
                        'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
                >
                    <RotateCcw size={16} className="mr-1" />
                    Reset
                </button>
            </div>

            <div className="star-collector-game">
                {stars.map(star => (
                    <div
                        key={star.id}
                        className={`collectable-star ${darkMode ? 'dark-star' : 'light-star'}`}
                        style={{
                            top: `${star.top}%`,
                            left: `${star.left}%`,
                            width: `${star.size}px`,
                            height: `${star.size}px`,
                            animationDelay: `${star.delay}s`
                        }}
                        onClick={() => collectStar(star.id)}
                    ></div>
                ))}
            </div>
        </div>
    );
}