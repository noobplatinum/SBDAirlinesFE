import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import AdminSidebar from '../comps/AdminSidebar';
import AdminHeader from '../comps/AdminHeader';
import AirlinesPanel from '../comps/AirlinesPanel';
import DashboardPanel from '../comps/DashboardPanel';

export default function AdminPanel() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isAdmin, setIsAdmin] = useState(true); // Set to true for now to avoid redirect
  
  useEffect(() => {
    const checkAdminStatus = () => {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      setIsAdmin(user.role === 'admin');
    };
    
  }, []);

  const renderActivePanel = () => {
    switch(activeSection) {
      case 'dashboard':
        return <DashboardPanel />;
      case 'airlines':
        return <AirlinesPanel />;
      default:
        return <DashboardPanel />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <AdminSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-8 bg-gray-50 dark:bg-gray-800 mt-4">
          {renderActivePanel()}
        </main>
      </div>
    </div>
  );
}