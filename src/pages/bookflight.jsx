import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { flightService, airlineService } from '../services/api';

export default function BookFlight() {
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);
  const [airlines, setAirlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search filters
  const [searchParams, setSearchParams] = useState({
    origin: '',
    destination: '',
    departureDate: '',
    airline: ''
  });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      fetchFlights();
      fetchAirlines();
    }
  }, [navigate]);

  const fetchFlights = async () => {
    try {
      setLoading(true);
      const response = await flightService.getAllFlights();
      setFlights(response.data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch flights:', err);
      setError('Failed to load flights. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fetchAirlines = async () => {
    try {
      const response = await airlineService.getAllAirlines();
      setAirlines(response.data);
    } catch (err) {
      console.error('Failed to fetch airlines:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatDateTime = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleString();
  };

  const filteredFlights = flights.filter(flight => {
    const matchesOrigin = searchParams.origin ?
      flight.asal_bandara.toLowerCase().includes(searchParams.origin.toLowerCase()) : true;

    const matchesDestination = searchParams.destination ?
      flight.tujuan_bandara.toLowerCase().includes(searchParams.destination.toLowerCase()) : true;

    const matchesAirline = searchParams.airline ?
      flight.maskapai_id._id === searchParams.airline : true;

    let matchesDate = true;
    if (searchParams.departureDate) {
      const searchDate = new Date(searchParams.departureDate);
      const flightDate = new Date(flight.jadwal_keberangkatan);
      matchesDate = flightDate.toDateString() === searchDate.toDateString();
    }

    return matchesOrigin && matchesDestination && matchesAirline && matchesDate;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Find Your Flight</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Search for available flights and book your next journey
          </p>
        </div>

        {/* Search Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="origin" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Origin
              </label>
              <input
                type="text"
                id="origin"
                name="origin"
                value={searchParams.origin}
                onChange={handleInputChange}
                placeholder="From City or Airport"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="destination" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Destination
              </label>
              <input
                type="text"
                id="destination"
                name="destination"
                value={searchParams.destination}
                onChange={handleInputChange}
                placeholder="To City or Airport"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="departureDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Departure Date
              </label>
              <input
                type="date"
                id="departureDate"
                name="departureDate"
                value={searchParams.departureDate}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="airline" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Airline
              </label>
              <select
                id="airline"
                name="airline"
                value={searchParams.airline}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Airlines</option>
                {airlines.map(airline => (
                  <option key={airline._id} value={airline._id}>
                    {airline.nama_maskapai}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Flights List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="p-8 text-center text-red-500 dark:text-red-400">
              <p>{error}</p>
              <button
                onClick={fetchFlights}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                <p className="text-gray-700 dark:text-gray-300">
                  {filteredFlights.length} {filteredFlights.length === 1 ? 'flight' : 'flights'} found
                </p>
              </div>

              {filteredFlights.length === 0 ? (
                <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                  <p>No flights match your search criteria. Try adjusting your filters.</p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredFlights.map(flight => (
                    <li
                      key={flight._id}
                      className="p-6 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/40"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0 w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                            <span className="text-xl font-bold text-blue-600 dark:text-blue-300">
                              {flight.maskapai_id?.nama_maskapai?.substring(0, 2) || 'FL'}
                            </span>
                          </div>
                          <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                              {flight.maskapai_id?.nama_maskapai || 'Unknown Airline'}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Flight ID: {flight._id}
                            </p>
                          </div>
                        </div>

                        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">From</p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">{flight.asal_bandara}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {formatDateTime(flight.jadwal_keberangkatan)}
                            </p>
                          </div>

                          <div className="flex items-center justify-center">
                            <div className="w-full flex items-center">
                              <div className="h-0.5 flex-1 bg-gray-300 dark:bg-gray-600"></div>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mx-2" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11.43a1 1 0 00-.293-.707l-2-2a1 1 0 010-1.414l2-2A1 1 0 009 4.429v-1.83a1 1 0 00-.724-.961l-3.5-1A1 1 0 004 1.5v1.416a1 1 0 00.319.727l2.258 2.258a1 1 0 01.087 1.32l-5.5 8a1 1 0 00.894 1.54l9-1a1 1 0 001.118-.999v-2.523a1 1 0 00-.293-.707l-2-2a1 1 0 010-1.414l2-2A1 1 0 0011 4.429v-.89a1 1 0 00-.553-.894l-2-1a1 1 0 00-.894 0l-2 1a1 1 0 00-.553.894v4.553a1 1 0 00.293.707l2 2a1 1 0 010 1.414l-2 2A1 1 0 004 15.571v.73a1 1 0 00.724.961l3.5 1a1 1 0 001.13-.5l2.5-5A1 1 0 0012 12v-1.793a1 1 0 00-.293-.707l-2-2a1 1 0 010-1.414l2-2A1 1 0 0012 3.5v-.25z" />
                              </svg>
                              <div className="h-0.5 flex-1 bg-gray-300 dark:bg-gray-600"></div>
                            </div>
                          </div>

                          <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">To</p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">{flight.tujuan_bandara}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {formatDateTime(flight.jadwal_kedatangan)}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col items-center">
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${flight.status_penerbangan === 'On Time' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' :
                              flight.status_penerbangan === 'Delayed' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100' :
                                'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                            }`}>
                            {flight.status_penerbangan}
                          </span>

                          <button
                            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            onClick={() => navigate(`/flight-details/${flight._id}`)}
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
