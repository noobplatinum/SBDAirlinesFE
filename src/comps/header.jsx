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
        <header className={`fixed top-0 left-0 right-0 z-50 ${darkMode ? 'bg-gradient-to-r from-slate-900 to-slate-800' : 'bg-gradient-to-r from-gray-100 to-white'} ${darkMode ? 'text-white' : 'text-gray-900'} p-6 md:p-7 lg:p-8 xl:p-9 shadow-lg backdrop-blur-sm bg-opacity-90 transition-all duration-300`}>
            <div className="min-w-full mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-2 md:py-3">
                <div className="flex items-center space-x-4 sm:space-x-5 md:space-x-6 lg:space-x-8">
                <img 
                    src={logopath} 
                    alt="Logo" 
                    className="h-14 w-14 p-4 sm:h-16 sm:w-16 md:h-18 md:w-18 lg:h-20 lg:w-20 xl:h-24 xl:w-24 bg-black dark:bg-transparent rounded-full" 
                    />                    <div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
                            <span className="text-blue-400">Net</span>Lab
                        </h1>
                        <p className={`text-sm sm:text-base md:text-lg lg:text-xl text-left ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Network Laboratory FTUI
                        </p>
                    </div>
                </div>
                
                <div className="hidden sm:flex items-center gap-4">
                    <div 
                        onClick={() => scrollToSection('overview')}
                        className={`cursor-pointer px-4 py-2 font-medium text-lg rounded-md ${darkMode ? 'text-gray-200 hover:text-blue-400' : 'text-gray-100 hover:text-blue-600'} hover:bg-opacity-10 hover:bg-blue-500 transition-all duration-200`}
                    >
                        Overview
                    </div>
                    <div 
                        onClick={() => scrollToSection('labs')}
                        className={`cursor-pointer px-4 py-2 font-medium text-lg rounded-md ${darkMode ? 'text-gray-200 hover:text-blue-400' : 'text-gray-100 hover:text-blue-600'} hover:bg-opacity-10 hover:bg-blue-500 transition-all duration-200`}
                    >
                        Labs
                    </div>
                    <div 
                        onClick={() => scrollToSection('praktikum')}
                        className={`cursor-pointer px-4 py-2 font-medium text-lg rounded-md ${darkMode ? 'text-gray-200 hover:text-blue-400' : 'text-gray-100 hover:text-blue-600'} hover:bg-opacity-10 hover:bg-blue-500 transition-all duration-200`}
                    >
                        Praktikum
                    </div>
                </div>
                
                <button 
                    onClick={toggleDarkMode}
                    aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                    className={`rounded-full p-1 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-all duration-300 flex items-center justify-center w-24 h-24`}
                >
                    {mounted && (
                        <>
                            {darkMode ? (
                                <Sun className="h-6 w-6 text-yellow-300 animate-spin-slow" />
                            ) : (
                                <Moon className="h-6 w-6 text-slate-700" />
                            )}
                        </>
                    )}
                </button>
            </div>
            
            <div className="sm:hidden fixed bottom-8 right-8">
                <button className={`${darkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-400'} text-white rounded-full p-5 shadow-lg transition-colors duration-200`}>
                    <i className="fas fa-bars text-2xl"></i>
                </button>
            </div>
        </header>
    );
}