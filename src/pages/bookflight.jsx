import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BookFlight() {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/login');
    }
    // else: show booking UI here in the future
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-xl font-semibold text-gray-700 dark:text-gray-200">
        {/* Placeholder: Booking UI goes here if user is logged in */}
        Book Flight Page
      </div>
    </div>
  );
}
