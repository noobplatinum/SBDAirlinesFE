import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { flightService, userTicketService } from '../services/api';
import { useTheme } from '../themeContext';

export default function FlightDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { darkMode } = useTheme();
    const [flight, setFlight] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [bookingDetails, setBookingDetails] = useState({
        seat_number: '',
        kelas_penerbangan: 'Ekonomi',
        harga_tiket: 0
    });
    const [isBooking, setIsBooking] = useState(false);
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [bookingError, setBookingError] = useState(null);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (!isLoggedIn) {
            navigate('/login', { state: { redirectTo: `/flight-details/${id}` } });
            return;
        }

        const fetchFlightDetails = async () => {
            try {
                setLoading(true);
                const response = await flightService.getFlightById(id);
                setFlight(response.data);

                // Set default pricing based on flight
                const basePrice = 750000; // Example base price
                setBookingDetails(prev => ({
                    ...prev,
                    harga_tiket: basePrice
                }));

            } catch (err) {
                console.error('Failed to fetch flight details:', err);
                setError('Failed to load flight details. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchFlightDetails();
    }, [id, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        let updatedPrice = bookingDetails.harga_tiket;

        // Update price based on class
        if (name === 'kelas_penerbangan') {
            const basePrice = 750000; // Example base price
            updatedPrice = value === 'Ekonomi' ? basePrice :
                value === 'Bisnis' ? basePrice * 2 :
                    basePrice * 4; // First Class
        }

        setBookingDetails(prev => ({
            ...prev,
            [name]: value,
            ...(name === 'kelas_penerbangan' ? { harga_tiket: updatedPrice } : {})
        }));
    };

    const handleBooking = async (e) => {
    e.preventDefault();
    
    // Get user from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user || !user._id) {
        setBookingError('You must be logged in to book a flight');
        return;
    }
    
    // Check if user has a passenger ID in localStorage
    if (!user.penumpang_id && !user.passenger_details) {
        setBookingError('Your account is not properly set up as a passenger. Please contact support.');
        return;
    }
    
    try {
        setIsBooking(true);
        setBookingError(null);
        
        await userTicketService.bookTicketForUser(
            user._id,
            flight._id,
            bookingDetails
        );
        
        setBookingSuccess(true);
        
        // Redirect to tickets page after a delay
        setTimeout(() => {
            navigate('/my-tickets');
        }, 2000);
    } catch (err) {
        console.error('Booking error:', err);
        if (err.response && err.response.status === 404) {
            setBookingError('User passenger profile not found. Please update your profile first.');
        } else {
            setBookingError(err.response?.data?.message || 'Failed to book ticket. Please try again.');
        }
    } finally {
        setIsBooking(false);
    }
};

    const formatDateTime = (dateStr) => {
        if (!dateStr) return 'N/A';
        const date = new Date(dateStr);
        return date.toLocaleString();
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center text-red-500 dark:text-red-400 p-8">
                    <p>{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (!flight) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center text-gray-600 dark:text-gray-400 p-8">
                    Flight not found
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            <div className="max-w-5xl mx-auto">
                {/* Flight Info */}
                <div className={`rounded-xl shadow-lg overflow-hidden mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className={`px-6 py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <h1 className="text-2xl font-bold">Flight Details</h1>
                    </div>

                    <div className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center ${darkMode ? 'bg-blue-900' : 'bg-blue-100'}`}>
                                    <span className={`text-xl font-bold ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                                        {flight.maskapai_id?.nama_maskapai?.substring(0, 2) || 'FL'}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium">
                                        {flight.maskapai_id?.nama_maskapai || 'Unknown Airline'}
                                    </h3>
                                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                        Aircraft: {flight.pesawat_id?.model_pesawat || 'Unknown'}
                                    </p>
                                </div>
                            </div>

                            <div className={`px-3 py-1 text-xs font-medium rounded-full self-start md:self-center ${flight.status_penerbangan === 'On Time'
                                    ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                                    : flight.status_penerbangan === 'Delayed'
                                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                                        : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                                }`}>
                                {flight.status_penerbangan}
                            </div>
                        </div>

                        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>From</p>
                                <p className="text-lg font-semibold">{flight.asal_bandara}</p>
                                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {formatDateTime(flight.jadwal_keberangkatan)}
                                </p>
                            </div>

                            <div className="flex items-center justify-center">
                                <div className="w-full flex items-center">
                                    <div className={`h-0.5 flex-1 ${darkMode ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mx-2 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11.43a1 1 0 00-.293-.707l-2-2a1 1 0 010-1.414l2-2A1 1 0 009 4.429v-1.83a1 1 0 00-.724-.961l-3.5-1A1 1 0 004 1.5v1.416a1 1 0 00.319.727l2.258 2.258a1 1 0 01.087 1.32l-5.5 8a1 1 0 00.894 1.54l9-1a1 1 0 001.118-.999v-2.523a1 1 0 00-.293-.707l-2-2a1 1 0 010-1.414l2-2A1 1 0 0011 4.429v-.89a1 1 0 00-.553-.894l-2-1a1 1 0 00-.894 0l-2 1a1 1 0 00-.553.894v4.553a1 1 0 00.293.707l2 2a1 1 0 010 1.414l-2 2A1 1 0 004 15.571v.73a1 1 0 00.724.961l3.5 1a1 1 0 001.13-.5l2.5-5A1 1 0 0012 12v-1.793a1 1 0 00-.293-.707l-2-2a1 1 0 010-1.414l2-2A1 1 0 0012 3.5v-.25z" />
                                    </svg>
                                    <div className={`h-0.5 flex-1 ${darkMode ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
                                </div>
                            </div>

                            <div>
                                <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>To</p>
                                <p className="text-lg font-semibold">{flight.tujuan_bandara}</p>
                                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {formatDateTime(flight.jadwal_kedatangan)}
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Gate</p>
                                <p className="text-base font-medium">{flight.gate_id?.nomor_gate || 'TBA'}</p>
                                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {flight.gate_id?.lokasi_gate || 'Location not available'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Booking Form */}
                {bookingSuccess ? (
                    <div className={`rounded-xl shadow-lg overflow-hidden p-8 text-center ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        <div className="flex justify-center mb-4">
                            <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Booking Successful!</h2>
                        <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            Your flight has been booked successfully. Redirecting to your tickets...
                        </p>
                    </div>
                ) : (
                    <div className={`rounded-xl shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        <div className={`px-6 py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                            <h2 className="text-2xl font-bold">Book This Flight</h2>
                        </div>

                        <form onSubmit={handleBooking} className="p-6 space-y-6">
                            {bookingError && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                                    <div className="flex items-center">
                                        <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {bookingError}
                                    </div>
                                </div>
                            )}

                            <div>
                                <label htmlFor="seat_number" className={`block mb-2 font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                                    Seat Number
                                </label>
                                <input
                                    type="text"
                                    id="seat_number"
                                    name="seat_number"
                                    value={bookingDetails.seat_number}
                                    onChange={handleInputChange}
                                    placeholder="e.g. 12A"
                                    className={`w-full px-4 py-3 border rounded-lg ${darkMode
                                            ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                                            : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500'
                                        } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200`}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="kelas_penerbangan" className={`block mb-2 font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                                    Class
                                </label>
                                <select
                                    id="kelas_penerbangan"
                                    name="kelas_penerbangan"
                                    value={bookingDetails.kelas_penerbangan}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 border rounded-lg ${darkMode
                                            ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                                            : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500'
                                        } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200`}
                                    required
                                >
                                    <option value="Ekonomi">Economy</option>
                                    <option value="Bisnis">Business</option>
                                    <option value="First Class">First Class</option>
                                </select>
                            </div>

                            <div>
                                <p className={`block mb-2 font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                                    Price
                                </p>
                                <div className={`w-full px-4 py-3 border rounded-lg font-medium text-lg ${darkMode
                                        ? 'bg-gray-700 border-gray-600 text-white'
                                        : 'bg-gray-50 border-gray-300 text-gray-900'
                                    }`}>
                                    Rp {bookingDetails.harga_tiket.toLocaleString()}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isBooking}
                                className={`w-full px-4 py-3 text-white font-medium rounded-lg ${darkMode
                                        ? 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800'
                                        : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700'
                                    } focus:outline-none focus:ring-4 ${darkMode ? 'focus:ring-blue-800' : 'focus:ring-blue-300'} ${isBooking ? 'opacity-70 cursor-not-allowed' : ''
                                    } transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center mt-4`}
                            >
                                {isBooking ? (
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
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Confirm Booking
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}