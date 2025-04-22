import { useState, useEffect } from 'react';
import netlabLogo from '../assets/netleb.png';
import sbdLogo from '../assets/sbd-logo.png';
import dmjLogo from '../assets/dmj-logo.png'; 
import osLogo from '../assets/os-logo.png';

export default function BioSection() {
    const buttonConfigs = [
        {
            id: "Netlab",
            image: netlabLogo,
            gradient: "from-blue-600 to-purple-600",
            borderColor: "border-white border-opacity-30",
            title: "Laboratory",
            titleHighlight: "Network",
            description: "Laboratorium DTE yang berfokus pada pelajaran jaringan dan development software.",
            skills: [
                "Web Development",
                "Computer Networking", 
                "Cybersecurity",
                "Operating Systems"
            ],
            experience: [
                "Unity Game Engine",
                "Packet Tracer",
                "PostgreSQL",
                "BlueJ / Java"
            ]
        },
        {
            id: "DMJ",
            image: dmjLogo,
            gradient: "from-pink-400 to-green-400",
            borderColor: "border-yellow-400 border-opacity-40",
            title: "Jaringan",
            titleHighlight: "Desain Manajemen",
            description: "DMJ berfokus pada pembangunan dan analisis jaringan komputer via Packet Tracer.",
            skills: [
                "VLAN Configuration",
                "Network Routing", 
                "Scaling and Maintaining",
                "Debugging Network Issues"
            ],
            experience: [
                "Packet Tracer",
                "Wireshark",
                "Switch & Routers",
                "Cisco IOS"
            ]
        },
        {
            id: "SBD",
            image: sbdLogo,
            gradient: "from-orange-300 to-teal-600",
            borderColor: "border-green-300 border-opacity-40",
            title: "Basis Data",
            titleHighlight: "Sistem",
            description: "SBD adalah pelajaran yang berfokus pada pengelolaan database lewat SQL dan NoSQL.",
            skills: [
                "Database Design",
                "SQL Queries", 
                "Data Modeling",
                "Web Development"
            ],
            experience: [
                "PostgreSQL",
                "React",
                "MongoDB",
                "Tailwind"
            ],
        },
        {
            id: "OS",
            image: osLogo,
            gradient: "from-violet-600 to-amber-400",
            borderColor: "border-purple-300 border-opacity-40",
            title: "System",
            titleHighlight: "Operating",
            description: "OS menangani konsep dasar dan penggunaan sistem operasi, terutama Unix dan Linux.",
            skills: [
                "Virtual Machines",
                "Interprocess Communication", 
                "File Systems",
                "Process Management"
            ],
            experience: [
                "Ubuntu Linux",
                "VMWare Workstation",
                "RedHat Academy",
                "VirtualBox"
            ]
        }
    ];

    const [selectedButton, setSelectedButton] = useState(0);
    const [currentConfig, setCurrentConfig] = useState(buttonConfigs[0]);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [previousGradient, setPreviousGradient] = useState('');
    const [showPreviousGradient, setShowPreviousGradient] = useState(false);
    
    useEffect(() => {
        setIsTransitioning(true);
        
        setPreviousGradient(currentConfig.gradient);
        setShowPreviousGradient(true);
        
        const timer = setTimeout(() => {
            setCurrentConfig(buttonConfigs[selectedButton]);
            
            setTimeout(() => {
                setIsTransitioning(false);
                setShowPreviousGradient(false);
            }, 150);
            
        }, 300);
        
        return () => clearTimeout(timer);
    }, [selectedButton]);

    const handleButtonClick = (index) => {
        if (selectedButton !== index && !isTransitioning) {
            setSelectedButton(index);
        }
    };

    return (
        <section className="py-16 md:py-20 lg:py-24 flex items-center justify-center">
            <div className="relative max-w-[95%] lg:max-w-[85%] xl:max-w-[80%] 2xl:max-w-[1800px] mx-auto">
                <div 
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-b ${currentConfig.gradient} p-[2px] -z-10 transition-all duration-700`}
                ></div>
                
                {showPreviousGradient && (
                    <div 
                        className={`absolute inset-0 rounded-3xl bg-gradient-to-b ${previousGradient} p-[2px] -z-10 transition-opacity duration-700 opacity-0`}
                    ></div>
                )}
                
                <div className="rounded-3xl bg-black/40 backdrop-blur-md p-8 md:p-10 lg:p-12 xl:p-16 overflow-hidden">
                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16">
                        <div className="md:w-1/3 flex flex-col items-center">
                            <div className="w-full flex justify-center mb-6">
                                <div className="inline-flex gap-3 md:gap-4 bg-black/20 backdrop-blur-sm rounded-full p-1.5">
                                    {buttonConfigs.map((config, index) => (
                                        <button 
                                            key={index}
                                            onClick={() => handleButtonClick(index)}
                                            className={`px-4 py-2 text-base md:text-lg lg:text-xl rounded-full transition-all duration-300 ${
                                                selectedButton === index 
                                                    ? `bg-gradient-to-b ${config.gradient} text-white font-semibold` 
                                                    : 'bg-transparent text-gray-300 hover:text-white'
                                            }`}
                                        >
                                            {config.id}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="aspect-square w-full max-w-[16rem] md:max-w-[20rem] lg:max-w-[24rem] xl:max-w-[28rem] 2xl:max-w-[32rem] relative">
                                <div 
                                    className={`absolute inset-0 rounded-full bg-gradient-to-b ${currentConfig.gradient} transition-all duration-700`}
                                ></div>
                                
                                {showPreviousGradient && (
                                    <div 
                                        className={`absolute inset-0 rounded-full bg-gradient-to-b ${previousGradient} transition-opacity duration-700 opacity-0`}
                                    ></div>
                                )}
                                
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-[80%] h-[80%] overflow-hidden rounded-full flex items-center justify-center bg-black/10 backdrop-blur-sm p-4">
                                        <img 
                                            src={currentConfig.image} 
                                            alt={`${currentConfig.id} Logo`} 
                                            className={`max-w-[90%] max-h-[90%] object-contain transition-all duration-500 ${isTransitioning ? 'opacity-0 blur-lg scale-95' : 'opacity-100 blur-0 scale-100'}`} 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className={`md:w-2/3 text-center transition-all duration-500 ${isTransitioning ? 'opacity-0 blur-md translate-y-4' : 'opacity-100 blur-0 translate-y-0'}`}>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 lg:mb-6">
                                <span className={`bg-gradient-to-r ${currentConfig.gradient} bg-clip-text text-transparent`}>
                                    {currentConfig.titleHighlight}
                                </span>{" "}
                                <span>{currentConfig.title.replace(currentConfig.titleHighlight, '')}</span>
                            </h2>
                            
                            <p className="text-gray-200 mb-6 lg:mb-8 text-lg md:text-xl lg:text-2xl xl:text-3xl">
                                {currentConfig.description}
                            </p>
                            
                            <div className="flex flex-col md:flex-row gap-6 lg:gap-8 justify-center">
                                <div className="md:w-1/2">
                                    <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-white mb-3 lg:mb-5">Technical Skills</h3>
                                    <ul className="space-y-2 lg:space-y-3 text-gray-200 text-lg md:text-xl lg:text-2xl">
                                        {currentConfig.skills.map((skill, index) => (
                                            <li key={index} className="flex items-center justify-center">
                                                <span className="mr-2 text-blue-400 text-2xl lg:text-3xl">•</span> {skill} <span className="ml-2 text-blue-400 text-2xl lg:text-3xl">•</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                
                                <div className="hidden md:block w-px bg-gray-500 opacity-50 mx-4 lg:mx-6"></div>
                                
                                <div className="md:w-1/2">
                                    <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-white mb-3 lg:mb-5">Tools</h3>
                                    <ul className="space-y-2 lg:space-y-3 text-gray-200 text-lg md:text-xl lg:text-2xl">
                                        {currentConfig.experience.map((exp, index) => (
                                            <li key={index} className="flex items-center justify-center">
                                                <span className="mr-2 text-blue-400 text-2xl lg:text-3xl">•</span> {exp} <span className="ml-2 text-blue-400 text-2xl lg:text-3xl">•</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}