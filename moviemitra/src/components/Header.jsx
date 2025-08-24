import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full bg-black/30 backdrop-blur-md shadow-md">
      <div className="hidden md:flex items-center justify-between" style={{ padding: '16px 32px' }}>
        <nav className="flex items-center">
          <Link
            to="/"
            className="text-gray-300 hover:text-blue-400 transition font-medium"
            style={{ marginRight: '48px' }}
          >
            Home
          </Link>
          <Link
            to="/favorites"
            className="text-gray-300 hover:text-blue-400 transition font-medium"
          >
            Favorites
          </Link>
        </nav>

        <Link to="/" className="flex items-center">
          <span className="text-4xl" style={{ marginRight: '12px' }}>🎬</span>
          <h1 className="text-3xl font-extrabold tracking-wide font-sans text-white">
            Movie<span className="text-blue-500">Mitra</span>
          </h1>
        </Link>
      </div>

      <div className="md:hidden flex items-center justify-between" style={{ padding: '22px 58px' }}>
        <nav className="flex items-center">
          <Link
            to="/"
            className="text-gray-300 hover:text-blue-400 transition font-medium text-xs flex items-center"
            style={{ marginRight: '36px' }}
          >
            <span style={{ marginRight: '4px' }}>🏠</span>
            Home
          </Link>
          <Link
            to="/favorites"
            className="text-gray-300 hover:text-blue-400 transition font-medium text-xs flex items-center"
          >
            <span style={{ marginRight: '4px' }}>❤️</span>
            Favorites
          </Link>
        </nav>

        
      </div>

      <div className="hidden sm:flex md:hidden items-center justify-between" style={{ padding: '14px 24px' }}>
        <nav className="flex items-center">
          <Link
            to="/"
            className="text-gray-300 hover:text-blue-400 transition font-medium"
            style={{ marginRight: '32px' }}
          >
            Home
          </Link>
          <Link
            to="/favorites"
            className="text-gray-300 hover:text-blue-400 transition font-medium"
          >
            Favorites
          </Link>
        </nav>

        <Link to="/" className="flex items-center">
          <span className="text-3xl" style={{ marginRight: '10px' }}>🎬</span>
          <h1 className="text-2xl font-extrabold tracking-wide font-sans text-white">
            Movie<span className="text-blue-500">Mitra</span>
          </h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;