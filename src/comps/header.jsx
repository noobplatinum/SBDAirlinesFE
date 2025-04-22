import logopath from '../assets/netleb.jpg';

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900 to-gray-800 text-white p-4 shadow-lg backdrop-blur-sm bg-opacity-90 transition-all duration-300">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <img src={logopath} alt="Logo" className="h-10 w-10" />
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            <span className="text-blue-400">hendy </span>skizo
                        </h1>
                        <p className="text-sm text-left text-gray-400">tunduk junior</p>
                    </div>
                </div>
                <nav>
                    <ul className="flex items-center space-x-6">
                        <li><a href="#home" className="hover:text-blue-400 transition-colors duration-200 font-medium px-3 py-2 rounded hover:bg-gray-700">rengrengcong</a></li>
                        <li><a href="#about" className="hover:text-blue-400 transition-colors duration-200 font-medium px-3 py-2 rounded hover:bg-gray-700">tes</a></li>
                        <li><a href="#services" className="hover:text-blue-400 transition-colors duration-200 font-medium px-3 py-2 rounded hover:bg-gray-700">tes</a></li>
                        <li><a href="#contact" className="hover:text-blue-400 transition-colors duration-200 font-medium px-3 py-2 rounded hover:bg-gray-700">tes</a></li>
                        <li><button className="bg-gray-700 text-white rounded-full p-5 hover:bg-gray-600 transition-colors duration-200 flex items-center justify-center"><i className="fas fa-moon text-xl"></i></button></li>
                    </ul>
                </nav>            
                </div>
        </header>
    );
}