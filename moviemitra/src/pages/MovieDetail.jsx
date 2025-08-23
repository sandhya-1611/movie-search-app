import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails } from '../services/movieApi';
import { useFavoritesContext } from '../context/FavoritesContext';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavoritesContext();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isMovieFavorite = movie ? isFavorite(movie.imdbID) : false;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      setError(null);

      const result = await getMovieDetails(id);

      if (result.success) {
        setMovie(result.movie);
      } else {
        setError(result.error);
      }

      setLoading(false);
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  const handleFavoriteToggle = () => {
    if (movie) {
      const movieForFavorites = {
        Title: movie.Title,
        Year: movie.Year,
        imdbID: movie.imdbID,
        Type: movie.Type,
        Poster: movie.Poster
      };
      toggleFavorite(movieForFavorites);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden animate-pulse">
          <div className="md:flex">
            <div className="md:w-1/3 h-96 md:h-auto bg-gray-600"></div>
            <div className="md:w-2/3 p-6 md:p-8 space-y-4">
              <div className="h-8 bg-gray-600 rounded w-3/4"></div>
              <div className="flex gap-4">
                <div className="h-6 bg-gray-600 rounded w-16"></div>
                <div className="h-6 bg-gray-600 rounded w-16"></div>
                <div className="h-6 bg-gray-600 rounded w-20"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-600 rounded"></div>
                <div className="h-4 bg-gray-600 rounded w-5/6"></div>
                <div className="h-4 bg-gray-600 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto text-center py-16">
        <div className="text-6xl mb-4">❌</div>
        <h2 className="text-2xl font-semibold text-white mb-4">Error Loading Movie</h2>
        <p className="text-gray-300 mb-8">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="max-w-6xl mx-auto text-center py-16">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-2xl font-semibold text-white mb-4">Movie Not Found</h2>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <button 
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span>Back to Search</span>
      </button>

      <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            <img
              src={movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400x600/1f2937/9ca3af?text=No+Poster'}
              alt={movie.Title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="md:w-2/3 p-6 md:p-8">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                {movie.Title}
              </h1>
              
              {isMovieFavorite && (
                <span className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-sm flex items-center">
                  ❤️ Favorite
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-4 mb-6">
              <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                {movie.Year}
              </span>
              {movie.Rated && movie.Rated !== 'N/A' && (
                <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">
                  {movie.Rated}
                </span>
              )}
              {movie.Runtime && movie.Runtime !== 'N/A' && (
                <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                  {movie.Runtime}
                </span>
              )}
              {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                <span className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-sm">
                  ⭐ {movie.imdbRating}
                </span>
              )}
            </div>

            <div className="space-y-4">
              {movie.Genre && movie.Genre !== 'N/A' && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Genre</h3>
                  <p className="text-gray-300">{movie.Genre}</p>
                </div>
              )}

              {movie.Director && movie.Director !== 'N/A' && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Director</h3>
                  <p className="text-gray-300">{movie.Director}</p>
                </div>
              )}

              {movie.Actors && movie.Actors !== 'N/A' && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Cast</h3>
                  <p className="text-gray-300">{movie.Actors}</p>
                </div>
              )}

              {movie.Plot && movie.Plot !== 'N/A' && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Plot</h3>
                  <p className="text-gray-300 leading-relaxed">{movie.Plot}</p>
                </div>
              )}
            </div>

            <div className="flex gap-4 mt-8">
              <button 
                onClick={handleFavoriteToggle}
                className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2 ${
                  isMovieFavorite
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                <svg className="w-4 h-4" fill={isMovieFavorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>{isMovieFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</span>
              </button>
              
              <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 border border-white/20">
                Share Movie
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;