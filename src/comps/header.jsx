import React from 'react';
import logopath from '../assets/netleb.png';

export default function Header() {
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6 md:p-7 lg:p-8 xl:p-9 shadow-lg backdrop-blur-sm bg-opacity-90 transition-all duration-300">
            <div className="min-w-full mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-2 md:py-3">
                <div className="flex items-center space-x-4 sm:space-x-5 md:space-x-6 lg:space-x-8">
                    <img src={logopath} alt="Logo" className="h-14 w-14 sm:h-16 sm:w-16 md:h-18 md:w-18 lg:h-20 lg:w-20 xl:h-24 xl:w-24" />
                    <div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
                            <span className="text-blue-400">Net</span>Lab
                        </h1>
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-left text-gray-400">Network Laboratory FTUI</p>
                    </div>
                </div>
                <nav className="hidden sm:block">
                    <ul className="flex items-center space-x-3 sm:space-x-4 md:space-x-6 lg:space-x-8 xl:space-x-10 2xl:space-x-12">
                        <li>
                            <button 
                                onClick={() => scrollToSection('overview')} 
                                className="text-white bg-transparent hover:text-blue-400 transition-colors duration-200 font-bold text-lg md:text-xl lg:text-2xl xl:text-3xl"
                            >
                                Overview
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => scrollToSection('labs')} 
                                className="text-white bg-transparent hover:text-blue-400 transition-colors duration-200 font-bold text-lg md:text-xl lg:text-2xl xl:text-3xl"
                            >
                                Labs
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => scrollToSection('praktikum')} 
                                className="text-white bg-transparent hover:text-blue-400 transition-colors duration-200 font-bold text-lg md:text-xl lg:text-2xl xl:text-3xl"
                            >
                                Praktikum
                            </button>
                        </li>
                    </ul>
                </nav>
                <button className="bg-transparent text-white rounded-full p-5 sm:p-6 md:p-7 lg:p-8 xl:p-9 2xl:p-10 hover:bg-gray-600 transition-colors duration-200 flex items-center justify-center">
                    <i className="fas fa-moon text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-5xl"></i>
                </button>
            </div>
            
            <div className="sm:hidden fixed bottom-8 right-8">
                <button className="bg-blue-600 text-white rounded-full p-5 shadow-lg hover:bg-blue-500 transition-colors duration-200">
                    <i className="fas fa-bars text-2xl"></i>
                </button>
            </div>
        </header>
    );
}