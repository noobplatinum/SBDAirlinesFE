import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { itemService } from '../services/api';
import { useTheme } from '../themeContext';

function ItemCard({ item }) {
  const { darkMode } = useTheme();
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };
  
  return (
    <div className={`rounded-lg overflow-hidden shadow-xl ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} transition-colors duration-300 h-full flex flex-col`}>
      <div className="relative overflow-hidden">
        <img 
          className="w-full h-56 object-cover transition-transform duration-700 hover:scale-110" 
          src={item.image_url} 
          alt={item.name} 
        />
        <div className={`absolute inset-0 ${darkMode ? 'bg-blue-900' : 'bg-blue-500'} opacity-20`}></div>
      </div>
      
      <div className="p-5 flex-grow">
        <h2 className="font-bold text-xl mb-3 line-clamp-1">{item.name}</h2>
        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} font-medium mb-2`}>
          {formatPrice(item.price)}
        </p>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Stock: {item.stock}
        </p>
      </div>
      
      <div className="px-5 pb-5 mt-auto">
        <button className={`px-4 py-2 rounded-md ${darkMode ? 
          'bg-blue-600 hover:bg-blue-700 text-white' : 
          'bg-blue-500 hover:bg-blue-600 text-white'
        } transition-colors duration-300 w-full font-medium`}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default function StoreItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { storeId } = useParams();
  const { darkMode } = useTheme();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await itemService.getItemsByStoreId(storeId);
        setItems(response.data.payload || []);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load store items');
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [storeId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className={`animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 ${darkMode ? 'border-blue-500' : 'border-blue-600'}`}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-center py-20 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        <h2 className="text-2xl font-bold mb-4">Error</h2>
        <p className="mb-6">{error}</p>
        <button 
          onClick={() => window.history.back()}
          className={`px-4 py-2 rounded-md ${darkMode ? 
            'bg-blue-600 hover:bg-blue-700 text-white' : 
            'bg-blue-500 hover:bg-blue-600 text-white'
          } transition-colors duration-300 font-medium`}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-16 text-center">
        <div className="inline-block">
          <div className="flex justify-center mb-4">
            <div className={`h-1 w-24 rounded-full ${darkMode ? 'bg-blue-500' : 'bg-blue-600'}`}></div>
          </div>
          <div className="mt-[100px]"></div>
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 relative ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Store Items
            <span className="absolute -left-3 -top-3 w-10 h-10 rounded-full opacity-20 bg-blue-500 -z-10 hidden md:block"></span>
          </h1>
        </div>
        
        <p className={`text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Browse all available <span className="text-blue-500 font-medium">products</span> from this store
        </p>
        
        <div className="flex justify-center mb-12">
          <div className="flex space-x-2">
            <span className={`inline-block w-2 h-2 rounded-full ${darkMode ? 'bg-blue-500' : 'bg-blue-600'}`}></span>
            <span className={`inline-block w-2 h-2 rounded-full ${darkMode ? 'bg-blue-500' : 'bg-blue-600'}`}></span>
            <span className={`inline-block w-2 h-2 rounded-full ${darkMode ? 'bg-blue-500' : 'bg-blue-600'}`}></span>
          </div>
        </div>
      </div>
      
      {items.length === 0 ? (
        <div className="text-center py-10">
          <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>No items available in this store.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div 
              key={item.id}
              className="transform transition-all duration-300 hover:scale-105"
              style={{
                opacity: 0,
                animation: 'fadeInUp 0.6s ease-out forwards',
                animationDelay: `${index * 150}ms`
              }}
            >
              <ItemCard item={item} />
            </div>
          ))}
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