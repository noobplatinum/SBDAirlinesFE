import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../themeContext';
import axios from 'axios';

export default function Stores() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    // Fetch stores data
    const fetchStores = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3000/store/getAll');
        
        if (response.data && response.data.success) {
          setStores(response.data.payload);
        } else {
          setError(response.data?.message || 'Failed to fetch stores');
        }
      } catch (err) {
        console.error('Error fetching stores:', err);
        setError('Failed to load stores. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchStores();
  }, [navigate]);
  
  const navigateToStoreItems = (storeId) => {
    navigate(`/store/${storeId}`);
  };

  // Format date to a more readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mx-auto px-4 pt-28 pb-16 relative z-10 flex-grow">
      <div className="mb-12 text-center">
        <div className="inline-block">
          <div className="flex justify-center mb-4">
            <div className={`h-1 w-24 rounded-full ${darkMode ? 'bg-blue-500' : 'bg-blue-600'}`}></div>
          </div>
          
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 relative ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Partner Stores
            <span className="absolute -left-3 -top-3 w-10 h-10 rounded-full opacity-20 bg-blue-500 -z-10 hidden md:block"></span>
          </h1>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className={`animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 ${darkMode ? 'border-blue-400' : 'border-blue-600'}`}></div>
        </div>
      ) : error ? (
        <div className={`text-center p-8 rounded-lg ${darkMode ? 'bg-red-900/20 text-red-200' : 'bg-red-100 text-red-600'}`}>
          <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-lg font-medium">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className={`mt-4 px-4 py-2 rounded-md ${darkMode ? 'bg-red-700 hover:bg-red-600' : 'bg-red-500 hover:bg-red-600'} text-white`}
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stores.length > 0 ? stores.map((store, index) => (
            <div 
            key={store.id}
            onClick={() => navigateToStoreItems(store.id)}
            className={`rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 cursor-pointer ${
                darkMode ? 'bg-gray-800' : 'bg-white'
            }`}
            style={{
                animationDelay: `${index * 100}ms`,
                opacity: 0,
                animation: 'fadeInUp 0.5s ease-out forwards',
                animationDelay: `${index * 100}ms`
            }}
            >
              <div className={`p-6 flex flex-col h-full`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {store.name}
                    </h2>
                    <div className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Store ID: {store.id.substring(0, 8)}...
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    darkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-800'
                  }`}>
                    Active
                  </div>
                </div>

                <div className={`flex items-start mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <svg className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p>{store.address}</p>
                </div>

                <div className={`mt-auto pt-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex justify-between">
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      <span>Created: {formatDate(store.created_at)}</span>
                    </div>
                    <button 
                        onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the parent onClick
                        navigateToStoreItems(store.id);
                        }}
                        className={`text-sm font-medium ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
                    >
                        Visit Toko 
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )) : (
            <div className={`col-span-full text-center py-16 rounded-lg ${
              darkMode ? 'bg-gray-800/50 text-gray-300' : 'bg-gray-100 text-gray-600'
            }`}>
              <svg className="mx-auto h-12 w-12 mb-4 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <p className="text-xl">No stores found</p>
              <p className="mt-2">Check back later for new stores</p>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}