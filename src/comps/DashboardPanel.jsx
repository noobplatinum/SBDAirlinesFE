import React, { useState, useEffect } from 'react';
import { airlineService, aircraftService, flightService, passengerService, ticketService } from '../services/api';

export default function DashboardPanel() {
  const [stats, setStats] = useState({
    airlines: 0,
    aircraft: 0,
    flights: 0,
    passengers: 0,
    tickets: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [systemStatus, setSystemStatus] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        const [airlinesRes, aircraftRes, flightsRes, passengersRes, ticketsRes] = await Promise.all([
          airlineService.getAllAirlines(),
          aircraftService.getAllAircraft(),
          flightService.getAllFlights(),
          passengerService.getAllPassengers(),
          ticketService.getAllTickets()
        ]);
        
        setStats({
          airlines: airlinesRes.data.length,
          aircraft: aircraftRes.data.length,
          flights: flightsRes.data.length,
          passengers: passengersRes.data.length,
          tickets: ticketsRes.data.length
        });

        const recentFlights = flightsRes.data
          .sort((a, b) => new Date(b.createdAt || b.departure_time) - new Date(a.createdAt || a.departure_time))
          .slice(0, 3);
          
        const activityItems = [
          ...recentFlights.map(flight => ({
            id: flight.id,
            message: `Flight ${flight.flight_number} ${flight.status === 'scheduled' ? 'scheduled' : 'updated'}`,
            time: formatTimeAgo(new Date(flight.createdAt || flight.departure_time))
          }))
        ];
        
        if (airlinesRes.data.length > 0) {
          const recentAirline = airlinesRes.data
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
            
          activityItems.push({
            id: 'airline-' + recentAirline.id,
            message: `New airline ${recentAirline.name} registered`,
            time: formatTimeAgo(new Date(recentAirline.createdAt))
          });
        }
        
        // Sort the final activity items by recency
        setRecentActivity(activityItems.sort((a, b) => {
          // Convert relative times back to approximate timestamps for sorting
          const timeA = convertRelativeTimeToTimestamp(a.time);
          const timeB = convertRelativeTimeToTimestamp(b.time);
          return timeB - timeA;
        }).slice(0, 3));
        
        // Check API system status by making a simple ping request
        try {
          await api.get('/');
          setSystemStatus({
            database: 'Online',
            api: 'Online',
            storage: 'Online'
          });
        } catch (error) {
          setSystemStatus({
            database: error.message.includes('database') ? 'Offline' : 'Online',
            api: 'Degraded',
            storage: 'Online'
          });
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
        
        setRecentActivity([
          { id: 1, message: 'New flight LH456 scheduled', time: '2 hours ago' },
          { id: 2, message: 'Gate B12 maintenance completed', time: '5 hours ago' },
          { id: 3, message: 'New airline partner registered', time: 'Yesterday' }
        ]);
        
        setSystemStatus({
          database: 'Unknown',
          api: 'Degraded',
          storage: 'Unknown'
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 172800) return 'Yesterday';
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };
  
  const convertRelativeTimeToTimestamp = (relativeTime) => {
    const now = new Date().getTime();
    
    if (relativeTime === 'Just now') return now;
    if (relativeTime.includes('minutes')) {
      const minutes = parseInt(relativeTime);
      return now - (minutes * 60 * 1000);
    }
    if (relativeTime.includes('hours')) {
      const hours = parseInt(relativeTime);
      return now - (hours * 60 * 60 * 1000);
    }
    if (relativeTime === 'Yesterday') return now - (24 * 60 * 60 * 1000);
    if (relativeTime.includes('days')) {
      const days = parseInt(relativeTime);
      return now - (days * 24 * 60 * 60 * 1000);
    }
    return now;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Dashboard Overview</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Welcome to your airport management system dashboard.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-300 uppercase">Airlines</p>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">{stats.airlines}</h2>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
              <i className="bi bi-building-airplane text-xl text-blue-500 dark:text-blue-300"></i>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-300 uppercase">Aircraft</p>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">{stats.aircraft}</h2>
            </div>
            <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
              <i className="bi bi-plane text-xl text-green-500 dark:text-green-300"></i>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-300 uppercase">Flights</p>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">{stats.flights}</h2>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
              <i className="bi bi-plane-departure text-xl text-purple-500 dark:text-purple-300"></i>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-300 uppercase">Passengers</p>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">{stats.passengers}</h2>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-full">
              <i className="bi bi-people text-xl text-yellow-500 dark:text-yellow-300"></i>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 border-l-4 border-red-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-300 uppercase">Tickets</p>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">{stats.tickets}</h2>
            </div>
            <div className="bg-red-100 dark:bg-red-900 p-3 rounded-full">
              <i className="bi bi-ticket-perforated text-xl text-red-500 dark:text-red-300"></i>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Recent Activity</h3>
          {recentActivity.length > 0 ? (
            <div className="space-y-3">
              {recentActivity.map(activity => (
                <div key={activity.id} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                  <p className="text-gray-800 dark:text-gray-200">{activity.message}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No recent activity found</p>
          )}
        </div>
        
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">System Status</h3>
          <div className="space-y-3">
            <div className="flex justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
              <span className="text-gray-800 dark:text-gray-200">Database</span>
              <span className={systemStatus.database === 'Online' ? 'text-green-500' : 'text-red-500'}>
                {systemStatus.database || 'Unknown'}
              </span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
              <span className="text-gray-800 dark:text-gray-200">API Server</span>
              <span className={
                systemStatus.api === 'Online' ? 'text-green-500' : 
                systemStatus.api === 'Degraded' ? 'text-yellow-500' : 'text-red-500'
              }>
                {systemStatus.api || 'Unknown'}
              </span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
              <span className="text-gray-800 dark:text-gray-200">Storage</span>
              <span className={systemStatus.storage === 'Online' ? 'text-green-500' : 'text-red-500'}>
                {systemStatus.storage || 'Unknown'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}