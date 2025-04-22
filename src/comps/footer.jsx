import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-slate-900/85 backdrop-blur-md py-8 mt-12 border-t border-blue-500/30">
      <div className="min-w-full mx-auto flex justify-between items-center px-6 lg:px-8">
        <div className="flex space-x-6">
          <i>April 2025 , Jesaya David</i>
        </div>
        
        <div className="text-right">
          <h3 className="text-2xl text-white/90 mb-2">Network laboratory</h3>
          <p className="text-base text-white/60">#ConnectingUs</p>
        </div>
      </div>
    </footer>
  );
}