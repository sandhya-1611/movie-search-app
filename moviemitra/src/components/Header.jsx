import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="w-full px-4 md:px-8 py-6 bg-black/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        <Link to="/" className="flex items-center space-x-3">
          <span className="text-3xl">🎬</span>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Movie<span className="text-blue-400">Mitra</span>
          </h1>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-200">
            Home
          </Link>
          <Link to="/favorites" className="text-gray-300 hover:text-white transition-colors duration-200">
            Favorites
          </Link>
        </nav>

        <button className="md:hidden text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;