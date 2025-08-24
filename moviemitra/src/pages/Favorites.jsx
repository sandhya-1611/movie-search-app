import React from 'react';
import { Link } from 'react-router-dom';
import { useFavoritesContext } from '../context/FavoritesContext';
import MovieGrid from '../components/MovieGrid';

const Favorites = () => {
  const { favorites, removeFromFavorites } = useFavoritesContext();

  const handleRemoveFromFavorites = (imdbID) => {
    removeFromFavorites(imdbID);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        background: 'linear-gradient(135deg, #0b1220 0%, #0f172a 50%, #0b1220 100%)',
        padding: '4rem 1rem',
      }}
    >
      <div className="max-w-7xl mx-auto">

        <div className="mb-12 text-center">
          <h1
            className="text-4xl md:text-5xl font-extrabold mb-6"
            style={{ color: '#C0A1D9' , marginBottom: '0.5rem' }} 
          >
            My Favorites ❤️
          </h1>
          <p
            className="text-xl md:text-2xl max-w-2xl mx-auto"
            style={{ color: '#D8B4FE', marginBottom: '1rem' }} 
          >
            Your personally curated collection of amazing movies
          </p>
        </div>

        {favorites.length > 0 && (
          <div className="mb-12 flex justify-center">
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px 24px',
                borderRadius: '9999px',
                background: 'rgba(15,23,42,0.6)',
                color: '#fff',
                fontWeight: '600',
                border: '0.5px solid',
                borderImage: 'linear-gradient(45deg, #a78bfa, #f0abfc) 1',
                boxShadow: '0 0 12px rgba(167,139,250,0.7), 0 0 25px rgba(240,171,252,0.5)',marginBottom: '0.8rem'
              }}
            >
              📚 {favorites.length} movie{favorites.length !== 1 ? 's' : ''} saved
            </div>
          </div>
        )}

        {favorites.length > 0 && (
          <div className="mb-12 flex justify-center">
            <button
              onClick={() => {
                if (
                  window.confirm(
                    'Are you sure you want to remove all favorites?'
                  )
                ) {
                  favorites.forEach((movie) => removeFromFavorites(movie.imdbID));
                }
              }}
              style={{
                padding: '12px 28px',
                borderRadius: '20px',
                background:
                  'linear-gradient(90deg, #ec4899, #8b5cf6)',
                color: '#fff',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(236,72,153,0.5)',
                transition: 'all 0.2s ease-in-out', marginBottom: '1rem'
              }}
              onMouseOver={(e) =>
                Object.assign(e.target.style, {
                  transform: 'scale(1.05)',
                  boxShadow: '0 6px 25px rgba(236,72,153,0.7)',
                })
              }
              onMouseOut={(e) =>
                Object.assign(e.target.style, {
                  transform: 'scale(1)',
                  boxShadow: '0 4px 15px rgba(236,72,153,0.5)',
                })
              }
            >
              Clear All Favorites
            </button>
          </div>
        )}

        {favorites.length > 0 ? (
          <MovieGrid movies={favorites} />
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">💔</div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              No favorites yet
            </h2>
            <p className="text-gray-300 text-lg md:text-xl mb-12 max-w-lg mx-auto">
              Start exploring movies and add them to your favorites!
            </p>
            <Link
              to="/"
              className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg hover:scale-105 transition-all duration-300"
            >
              Discover Movies
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
