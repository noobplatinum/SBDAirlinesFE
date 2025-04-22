import ShootingStars from './comps/shootingStars';
import './App.css';
import Header from './comps/header';
import GeneralSection from './comps/generalsection'; // Import the new component
import MainCircle from './comps/maincircle';
import BioSection from './comps/biosection';
import Footer from './comps/footer';
import { ThemeProvider } from './themeContext';

export default function App() {
  return (
    <ThemeProvider>
    <div className="relative">
      <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
        <ShootingStars />
      </div>
      <Header />
      
      <main className="relative z-10">
        <section id="overview">
          <GeneralSection 
            title="Network Laboratory DTE FTUI"  
            subtitle="Netlab adalah laboratorium yang didirikan pada tahun XXXX di Universitas Indonesia. Tugas utama Netlab adalah untuk mengawasi aktivitas praktikum mata-mata kuliah berbasis jaringan dan aplikasi high-level, seperti development game/web dan jaringan." 
          />
        </section>
        
        <section id="labs" className="py-8 md:py-12 lg:py-16 flex items-center justify-center">
          <MainCircle />
        </section>
        
        <div className='h-[100px]'></div>
        <section id="praktikum" className="mt-12 md:mt-24 lg:mt-[150px] py-8 md:py-12 lg:py-16 enable-scroll">
          <BioSection />
        </section>
        
        <Footer />
      </main>
    </div>
    </ThemeProvider>
  );
}