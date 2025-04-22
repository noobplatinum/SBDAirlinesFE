import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-slate-900/85 backdrop-blur-md py-8 mt-12 border-t border-blue-500/30">
      <div className="min-w-full mx-auto flex justify-between items-center px-6 lg:px-8">
        <div className="flex space-x-6">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-blue-400 transition-colors">
            GitHub
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-blue-400 transition-colors">
            LinkedIn
          </a>
        </div>
        
        <div className="text-right">
          <h3 className="text-2xl text-white/90 mb-2">Cosmic Portfolio</h3>
          <p className="text-base text-white/60">Exploring the universe of possibilities</p>
        </div>
      </div>
    </footer>
  );
}