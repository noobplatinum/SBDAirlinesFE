import React, { useState, useEffect } from 'react';
import logopath from '../assets/netleb.png';
import { useTheme } from '../themeContext'; 
import { Moon, Sun } from 'lucide-react';

export default function Header() {
    const { darkMode, toggleDarkMode } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 ${darkMode ? 'bg-gradient-to-r from-slate-900 to-slate-800' : 'bg-gradient-to-r from-gray-100 to-white'} ${darkMode ? 'text-white' : 'text-gray-900'} p-2 sm:p-3 md:p-4 lg:p-8 xl:p-9 shadow-lg backdrop-blur-sm bg-opacity-90 transition-all duration-300`}>
            <div className="min-w-full mx-auto flex justify-between items-center px-2 sm:px-3 md:px-4 lg:px-8 xl:px-12 2xl:px-16 py-1 md:py-2 lg:py-3">
                <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 lg:space-x-8">
                <img 
                    src={logopath} 
                    alt="Logo" 
                    className="h-8 w-8 p-1.5 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-20 lg:w-20 xl:h-24 xl:w-24 bg-black dark:bg-transparent rounded-full" 
                    />                    
                    <div>
                        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
                            <span className="text-blue-400">Net</span>Lab
                        </h1>
                        <p className={`text-xs sm:text-sm md:text-base lg:text-xl text-left ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Network Lab FTUI
                        </p>
                    </div>
                </div>
                
                <div className="hidden sm:flex items-center gap-2 md:gap-3 lg:gap-4">
                    <div 
                        onClick={() => scrollToSection('overview')}
                        className={`cursor-pointer px-2 py-1 md:px-3 md:py-1.5 lg:px-4 lg:py-2 font-medium text-sm md:text-base lg:text-lg rounded-md ${darkMode ? 'text-gray-200 hover:text-blue-400' : 'text-gray-100 hover:text-blue-600'} hover:bg-opacity-10 hover:bg-blue-500 transition-all duration-200`}
                    >
                        Overview
                    </div>
                    <div 
                        onClick={() => scrollToSection('labs')}
                        className={`cursor-pointer px-2 py-1 md:px-3 md:py-1.5 lg:px-4 lg:py-2 font-medium text-sm md:text-base lg:text-lg rounded-md ${darkMode ? 'text-gray-200 hover:text-blue-400' : 'text-gray-100 hover:text-blue-600'} hover:bg-opacity-10 hover:bg-blue-500 transition-all duration-200`}
                    >
                        Labs
                    </div>
                    <div 
                        onClick={() => scrollToSection('praktikum')}
                        className={`cursor-pointer px-2 py-1 md:px-3 md:py-1.5 lg:px-4 lg:py-2 font-medium text-sm md:text-base lg:text-lg rounded-md ${darkMode ? 'text-gray-200 hover:text-blue-400' : 'text-gray-100 hover:text-blue-600'} hover:bg-opacity-10 hover:bg-blue-500 transition-all duration-200`}
                    >
                        Praktikum
                    </div>
                </div>
                
                <button 
                    onClick={toggleDarkMode}
                    aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                    className={`rounded-full p-1 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-all duration-300 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-24 lg:h-24`}
                >
                    {mounted && (
                        <>
                            {darkMode ? (
                                <Sun className="h-4 w-4 sm:h-5 sm:w-5 md:h-5 md:w-5 lg:h-6 lg:w-6 text-yellow-300 animate-spin-slow" />
                            ) : (
                                <Moon className="h-4 w-4 sm:h-5 sm:w-5 md:h-5 md:w-5 lg:h-6 lg:w-6 text-slate-700" />
                            )}
                        </>
                    )}
                </button>
            </div>
        </header>
    );
}