import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './themeContext';
import ShootingStars from './comps/shootingStars';
import Navbar from './comps/navbar';
import Footer from './comps/footer';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import AdminPanel from './pages/adminPage';
import BookFlight from './pages/bookflight'; // Import the BookFlight component
import './App.css';
// import Notes from './pages/notes';

export default function App() {
  return (
    <Router>
      <ThemeProvider>
        <div className="flex flex-col min-h-screen">
          <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
            <ShootingStars />
          </div>
          
          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/bookflight" element={<BookFlight />} /> {/* Add the BookFlight route */}
              </Routes>
            </main>
            
            <Footer />
          </div>
        </div>
      </ThemeProvider>
    </Router>
  );
}