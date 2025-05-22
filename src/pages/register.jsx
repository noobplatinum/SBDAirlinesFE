import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import { useTheme } from '../themeContext';

export default function Register() {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nomor_identitas, setNomorIdentitas] = useState('');
  const [nomor_telepon, setNomorTelepon] = useState('');
  const [kewarganegaraan, setKewarganegaraan] = useState('Indonesia');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  
  const handleRegister = async (e) => {
  e.preventDefault();
  
  if (password !== confirmPassword) {
    setError('Passwords do not match');
    return;
  }
  
  setIsLoading(true);
  setError('');
  setSuccessMsg('');
  
  try {
    // Combine all the data into a single registration request
    const userData = {
      username,
      email,
      password,
      name, // Send name for passenger record
      nomor_identitas,
      nomor_telepon,
      kewarganegaraan,
      role: 'passenger' // Default role
    };
    
    console.log('Registering with data:', userData);
    
    const response = await authService.register(userData);
    
    if (response.data && response.data.user) {
      console.log('User registered:', response.data.user);
      
      setSuccessMsg('Registration successful! Logging you in...');
      
      // Store the user data in local storage
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('isLoggedIn', 'true');
      
      // Navigate to home page after a brief delay
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } else {
      setError('Registration failed. Please try again.');
    }
  } catch (err) {
    console.error('Registration error:', err);
    
    if (err.response) {
      // Handle specific errors from the server
      if (err.response.data?.message?.includes('User with this email or username already exists')) {
        setError('This username or email is already registered. Please use different credentials.');
      } else if (err.response.data?.message?.includes('E11000 duplicate key error')) {
        setError('This email or phone number is already in use. Please use different details.');
      } else {
        setError(err.response.data?.message || 'Registration failed. Please try again.');
      }
    } else if (err.request) {
      setError('No response from server. Please check your connection.');
    } else {
      setError('Error: ' + err.message);
    }
  } finally {
    setIsLoading(false);
  }
};
  
  return (
    <div className="min-h-screen flex items-center justify-center pt-28" style={{ background: 'none' }}>
      <div className={`relative max-w-md w-full p-10 rounded-3xl shadow-2xl border-2 transition-all duration-300 ${
        darkMode 
          ? 'bg-gray-900 text-white border-gray-700 shadow-blue-900/40'
          : 'bg-white text-gray-800 border-gray-200 shadow-indigo-200/60'
      }`}>
        {/* Logo/Icon */}
        <div className="flex justify-center mb-4">
          <div className={`rounded-full p-3 shadow-lg ${
            darkMode ? 'bg-blue-800/80' : 'bg-blue-100'
          }`}>
            <svg className="w-10 h-10 text-blue-600 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.5 19.5l19-7-19-7v6l15 1-15 1v6z" />
            </svg>
          </div>
        </div>
        <h2 className="text-3xl font-extrabold mb-8 text-center tracking-tight drop-shadow-lg">Register to Airport System</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 shadow flex items-center animate-fade-in">
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6 shadow flex items-center animate-fade-in">
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>{successMsg}</span>
          </div>
        )}
        
        <form onSubmit={handleRegister} className="space-y-7">
          <div>
            <label htmlFor="username" className={`block mb-2 font-semibold tracking-wide text-left ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}> 
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full px-4 py-3 border rounded-xl shadow-sm ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500' 
                  : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-all duration-200`}
              required
              placeholder="your_username"
              autoComplete="username"
            />
          </div>
          
          <div>
            <label htmlFor="name" className={`block mb-2 font-semibold tracking-wide text-left ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}> 
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-4 py-3 border rounded-xl shadow-sm ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500' 
                  : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-all duration-200`}
              required
              placeholder="Your full name"
            />
          </div>
          
          <div>
            <label htmlFor="email" className={`block mb-2 font-semibold tracking-wide text-left ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}> 
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 border rounded-xl shadow-sm ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500' 
                  : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-all duration-200`}
              required
              placeholder="your@email.com"
            />
          </div>
          
          <div>
            <label htmlFor="nomor_identitas" className={`block mb-2 font-semibold tracking-wide text-left ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}> 
              ID Number (KTP/Passport)
            </label>
            <input
              type="text"
              id="nomor_identitas"
              value={nomor_identitas}
              onChange={(e) => setNomorIdentitas(e.target.value)}
              className={`w-full px-4 py-3 border rounded-xl shadow-sm ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500' 
                  : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-all duration-200`}
              placeholder="Your ID number (optional)"
            />
          </div>
          
          <div>
            <label htmlFor="nomor_telepon" className={`block mb-2 font-semibold tracking-wide text-left ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}> 
              Phone Number
            </label>
            <input
              type="text"
              id="nomor_telepon"
              value={nomor_telepon}
              onChange={(e) => setNomorTelepon(e.target.value)}
              className={`w-full px-4 py-3 border rounded-xl shadow-sm ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500' 
                  : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-all duration-200`}
              placeholder="Your phone number (optional)"
            />
          </div>
          
          <div>
            <label htmlFor="kewarganegaraan" className={`block mb-2 font-semibold tracking-wide text-left ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}> 
              Nationality
            </label>
            <input
              type="text"
              id="kewarganegaraan"
              value={kewarganegaraan}
              onChange={(e) => setKewarganegaraan(e.target.value)}
              className={`w-full px-4 py-3 border rounded-xl shadow-sm ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500' 
                  : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-all duration-200`}
              required
              placeholder="Your nationality"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="password" className={`font-semibold tracking-wide ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Password</label>
            </div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-3 border rounded-xl shadow-sm ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500' 
                  : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-all duration-200`}
              required
              placeholder="••••••••"
              autoComplete="new-password"
              minLength={6}
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="confirmPassword" className={`font-semibold tracking-wide ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Confirm Password</label>
            </div>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full px-4 py-3 border rounded-xl shadow-sm ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500' 
                  : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-all duration-200`}
              required
              placeholder="••••••••"
              autoComplete="new-password"
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full px-4 py-3 text-white font-semibold rounded-xl shadow-md transition-all duration-200 flex items-center justify-center gap-2
              ${darkMode
                ? 'bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-900 focus:ring-blue-900'
                : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:ring-blue-300'}
              focus:outline-none focus:ring-4
              ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.03]'}
            `}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Register
              </>
            )}
          </button>
          
          <div className="mt-6 text-center">
            <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
              Already have an account?{' '}
              <Link to="/login" className="text-blue-500 hover:underline font-semibold transition-colors duration-150">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}