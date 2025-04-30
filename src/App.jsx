import ShootingStars from './comps/shootingStars';
import './App.css';
import Footer from './comps/footer';
import Navbar from './comps/navbar';
import EnterStores from './comps/enterStores';
import { ThemeProvider } from './themeContext';
import GeneralSection from './comps/generalsection';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Stores from './pages/stores';
import StoreItems from './pages/storeItems';
import { useTheme } from './themeContext';

function Home() {
  const { darkMode } = useTheme();
  
  return (
    <>
      <div className="relative z-10">
        <GeneralSection 
          title="SBD Store"  
          subtitle="SBD Store menyediakan berbagai barang sehari-hari, mulai dari pakaian hingga alat elektronik! Belanja dengan aman di SBD Store!"
          showLoginButton={true}
        />
      </div>
      <main className="container mx-auto px-4 pt-28 pb-16 relative z-10 flex-grow">
        <EnterStores />
      </main>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <ThemeProvider>
        <div className="flex flex-col min-h-screen">
          <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
            <ShootingStars />
          </div>
          
          <Navbar />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/stores" element={<Stores />} />
            <Route path="/store/:storeId" element={<StoreItems />} />
          </Routes>
          
          <Footer />
        </div>
      </ThemeProvider>
    </Router>
  );
}