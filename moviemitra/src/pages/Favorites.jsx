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
    <div className="max-w-7xl mx-auto">

      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          My Favorites ❤️
        </h1>
        <p className="text-xl text-gray-300">
          Your personally curated collection of amazing movies
        </p>
      </div>

      {favorites.length > 0 && (
        <div className="mb-6">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
            <span className="text-white font-medium">
              📚 {favorites.length} movie{favorites.length !== 1 ? 's' : ''} saved
            </span>
          </div>
        </div>
      )}

      {favorites.length > 0 && (
        <div className="mb-8 text-right">
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to remove all favorites?')) {
                favorites.forEach(movie => removeFromFavorites(movie.imdbID));
              }
            }}
            className="bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
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
          <h2 className="text-3xl font-bold text-white mb-4">No favorites yet</h2>
          <p className="text-gray-300 text-lg mb-8">
            Start exploring movies and add them to your favorites!
          </p>
          <Link
            to="/"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Discover Movies
          </Link>
        </div>
      )}
    </div>
  );
};

export default Favorites;