import ShootingStars from './comps/shootingStars';
import './App.css';
import Header from './comps/header';
import GeneralSection from './comps/generalsection'; // Import the new component
import MainCircle from './comps/maincircle';
import BioSection from './comps/biosection';
import Footer from './comps/footer';

export default function App() {
  return (
    <div className="relative min-h-screen">
      {/* Fixed background */}
      <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
        <ShootingStars />
      </div>
      
      {/* Header - fixed at top */}
      <Header />
      
      {/* Main content sections */}
      <main className="relative z-10">
        {/* General section with large text and circle */}
        <section>
          <GeneralSection 
            title="Cosmic Portfolio" 
            subtitle="Navigating the digital universe with stellar web development and design" 
          />
        </section>
        
        {/* Hero section with MainCircle */}
        <section className="min-h-screen flex items-center justify-center">
          <MainCircle />
        </section>
        
        {/* Bio section */}
        <section className="min-h-screen py-16 enable-scroll">
          <BioSection />
        </section>
        
        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}