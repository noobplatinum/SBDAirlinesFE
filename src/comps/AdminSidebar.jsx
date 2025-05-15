import React from 'react';

export default function AdminSidebar({ activeSection, setActiveSection }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'grid-2' },
    { id: 'airlines', label: 'Airlines', icon: 'building-airplane' },
    { id: 'aircraft', label: 'Aircraft', icon: 'plane' },
    { id: 'terminals', label: 'Terminals', icon: 'door-open' },
    { id: 'gates', label: 'Gates', icon: 'gate' },
    { id: 'passengers', label: 'Passengers', icon: 'people' },
    { id: 'flights', label: 'Flights', icon: 'plane-departure' },
    { id: 'tickets', label: 'Tickets', icon: 'ticket-perforated' }
  ];
  
  return (
    <div className="w-64 bg-gray-800 dark:bg-gray-900 text-white flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-xl font-bold">Airport Admin</h1>
      </div>
      <nav className="flex-1 overflow-y-auto py-6">
        <ul className="space-y-2">
          {navItems.map(item => (
            <li key={item.id} className="px-4">
              <button
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center w-full px-4 py-3 rounded-md ${
                  activeSection === item.id 
                    ? 'bg-indigo-700 text-white' 
                    : 'text-black hover:bg-gray-700 hover:text-white'
                } transition-colors`}
              >
                <span className="inline-flex items-center justify-center mr-3">
                  <i className={`bi bi-${item.icon}`}></i>
                </span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <button className="flex items-center w-full px-4 py-3 text-gray-300 rounded-md hover:bg-gray-700 hover:text-white transition-colors">
          <span className="inline-flex items-center justify-center w-6 h-6 mr-3">
            <i className="bi bi-box-arrow-left"></i>
          </span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}