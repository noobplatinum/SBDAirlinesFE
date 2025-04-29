import ShootingStars from './comps/shootingStars';
import './App.css';
import Footer from './comps/footer';
import Navbar from './comps/navbar';
import CardGrid from './comps/cardGrid';
import StarCollector from './comps/starCollector';
import { ThemeProvider } from './themeContext';

export default function App() {
  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen">
        <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
          <ShootingStars />
        </div>
        
        <Navbar />
        
        <main className="container mx-auto px-4 pt-28 pb-16 relative z-1 flex-grow">
          <section className="mb-16">
            <h1 className="mt-[100px] text-3xl font-bold mb-4 text-center text-blue-400">Star Collector Minigame</h1>
            <p className="text-center mb-8 text-blue-300">Komponen Pengujian UseEffect dan UseState</p>
            <StarCollector />
          </section>
          
          <CardGrid />
        </main>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
}