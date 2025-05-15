import React from 'react';
import { useNavigate } from 'react-router-dom';
import GeneralSection from '../comps/generalsection';
import ImageCarousel from '../comps/imageCarousel';
import FeaturesSection from '../comps/featuresSection';
import TestimonialsSection from '../comps/testimonials';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative">
      <div className="relative z-10">
        <GeneralSection 
          showLoginButton={true}
        />
      </div>
      
      <div className="fixed top-4 right-4 z-50">
        <button 
          onClick={() => navigate('/admin')}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-red-700 shadow-md"
        >
          Admin Panel
        </button>
      </div>
      
      <ImageCarousel />
      
      <FeaturesSection />
      
      <TestimonialsSection />
    </div>
  );
}