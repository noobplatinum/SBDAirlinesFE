import { useState } from 'react';
import logopath from '../assets/netleb.jpg';

export default function BioSection({ gradient = "from-gray-800 to-blue-900" }) {
    // Default gradient is gray to blue, but can be changed when an orbital is clicked
    const [currentGradient, setCurrentGradient] = useState(gradient);

    return (
        <section className={`w-full min-h-screen py-24 bg-gradient-to-r ${currentGradient} flex items-center justify-center`}>
            <div className="w-full px-8 md:px-12 lg:px-16 xl:px-24">
                <div className="flex flex-col md:flex-row items-center gap-12 max-w-[1800px] mx-auto">
                    {/* Left side - Big logo with circular container */}
                    <div className="md:w-1/3 flex justify-center">
                        {/* Add a wrapper div with aspect-ratio to maintain the circle */}
                        <div className="aspect-square w-full max-w-[16rem] md:max-w-[20rem] relative">
                            <img 
                                src={logopath} 
                                alt="Logo" 
                                className="absolute inset-0 w-full h-full rounded-full object-cover border-4 border-white border-opacity-30 shadow-2xl" 
                            />
                        </div>
                    </div>
                    
                    {/* Right side - Content */}
                    <div className="md:w-2/3">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            <span className="text-blue-400">About </span>
                            <span>hendy skizo</span>
                        </h2>
                        
                        {/* Rest of the content remains unchanged */}
                        <p className="text-gray-200 mb-8 text-lg md:text-xl">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam 
                            at justo vel magna convallis efficitur. Proin vel sem et ipsum 
                            sodales venenatis eu et nibh. Integer quis lectus eu dui 
                            tincidunt tempus ac non lorem.
                        </p>
                        
                        {/* Two lists with vertical separator */}
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="md:w-1/2">
                                <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">Technical Skills</h3>
                                <ul className="space-y-2 text-gray-200 text-lg">
                                    <li className="flex items-center">
                                        <span className="mr-2 text-blue-400">•</span> React Development
                                    </li>
                                    <li className="flex items-center">
                                        <span className="mr-2 text-blue-400">•</span> UI/UX Design
                                    </li>
                                    <li className="flex items-center">
                                        <span className="mr-2 text-blue-400">•</span> Responsive Web Design
                                    </li>
                                    <li className="flex items-center">
                                        <span className="mr-2 text-blue-400">•</span> Full Stack Development
                                    </li>
                                </ul>
                            </div>
                            
                            {/* Vertical divider */}
                            <div className="hidden md:block w-px bg-gray-500 opacity-50 mx-4"></div>
                            
                            <div className="md:w-1/2">
                                <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">Experience</h3>
                                <ul className="space-y-2 text-gray-200 text-lg">
                                    <li className="flex items-center">
                                        <span className="mr-2 text-blue-400">•</span> Frontend Developer (5+ years)
                                    </li>
                                    <li className="flex items-center">
                                        <span className="mr-2 text-blue-400">•</span> UI Designer (3+ years)
                                    </li>
                                    <li className="flex items-center">
                                        <span className="mr-2 text-blue-400">•</span> Technical Lead (2+ years)
                                    </li>
                                    <li className="flex items-center">
                                        <span className="mr-2 text-blue-400">•</span> Project Manager (1+ year)
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}