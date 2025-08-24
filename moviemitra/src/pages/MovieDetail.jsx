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

    if (id) fetchMovieDetails();
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
      <div className="max-w-7xl mx-auto py-16 px-6">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden animate-pulse h-96 md:h-[600px]"></div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="max-w-7xl mx-auto text-center py-16 px-6">
        <div className="text-6xl mb-4">❌</div>
        <h2 className="text-3xl font-bold text-white mb-6">Movie Not Found</h2>
        <button
          onClick={() => {
            if (window.history.length > 2) {
              navigate(-1);
            } else {
              navigate('/search'); 
            }
          }}
          className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl shadow-lg hover:scale-105 transition-all duration-300 font-semibold"
        >
          Back to Search
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        background: 'linear-gradient(135deg, #0b1220 0%, #0f172a 50%, #0b1220 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem 1rem',
      }}
    >
      <div className="max-w-7xl w-full flex flex-col items-center">
        <div>
          <button
            onClick={() => {
              if (window.history.length > 2) {
                navigate(-1);
              } else {
                navigate('/search'); 
              }
            }}
            style={{
              padding: '12px 28px',
              borderRadius: '20px',
              background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
              color: '#fff',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(59,130,246,0.5)',
              transition: 'all 0.2s ease-in-out',
            }}
          >
            Back to Search
          </button>
        </div>

        <h1
          className="text-3xl lg:text-4xl font-bold text-white text-center"
          style={{ marginTop: '2rem', marginBottom: '2rem' }}
        >
          {movie.Title}
        </h1>

        <div
          className="bg-white/5 backdrop-blur-md rounded-2xl p-8 shadow-2xl w-full"
          style={{ maxWidth: '1000px' }}
        >
          <div className="flex flex-col lg:flex-row gap-8 items-start">

            <div className="w-full lg:w-auto flex justify-center lg:justify-start flex-shrink-0">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-xl">
                <img
                  src={
                    movie.Poster && movie.Poster !== 'N/A'
                      ? movie.Poster
                      : 'https://via.placeholder.com/300x450/1f2937/9ca3af?text=No+Poster'
                  }
                  alt={movie.Title}
                  className="w-full h-auto rounded-lg object-cover shadow-lg"
                  style={{ width: '300px', maxHeight: '450px' }}
                />
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-start space-y-6">
              
              {movie.Plot && movie.Plot !== 'N/A' && (
                <p className="text-gray-300 text-base leading-relaxed">{movie.Plot}</p>
              )}

              <div className="space-y-3">
                {movie.Year && (
                  <div>
                    <span className="text-white font-extrabold">Date Released: </span>
                    <span className="text-white">{movie.Released || movie.Year}</span>
                  </div>
                )}
                {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                  <div>
                    <span className="text-white font-extrabold">Rating: </span>
                    <span className="text-white">{movie.imdbRating}</span>
                    {movie.imdbVotes && movie.imdbVotes !== 'N/A' && (
                      <span className="text-gray-400 text-sm ml-2">({movie.imdbVotes} votes)</span>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-3">
                {movie.Genre && (
                  <div>
                    <span className="text-white font-extrabold">Genre: </span>
                    <span className="text-white">{movie.Genre}</span>
                  </div>
                )}
                {movie.Runtime && (
                  <div>
                    <span className="text-white font-extrabold">Runtime: </span>
                    <span className="text-white">{movie.Runtime}</span>
                  </div>
                )}
                {movie.Rated && (
                  <div>
                    <span className="text-white font-extrabold">Rated: </span>
                    <span className="text-white">{movie.Rated}</span>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                {movie.Director && (
                  <div>
                    <span className="text-white font-extrabold">Director: </span>
                    <span className="text-white">{movie.Director}</span>
                  </div>
                )}
                {movie.Actors && (
                  <div>
                    <span className="text-white font-extrabold">Cast: </span>
                    <span className="text-white">{movie.Actors}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-12">
            <button
              onClick={handleFavoriteToggle}
              style={{
                padding: '14px 32px',
                borderRadius: '25px',
                background: isMovieFavorite
                  ? 'linear-gradient(90deg, #f43f5e, #a78bfa)'
                  : 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                color: '#fff',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 8px 25px rgba(236,72,153,0.4)',
                transition: 'all 0.3s ease-in-out',
                fontSize: '16px',
              }}
            >
              {isMovieFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
