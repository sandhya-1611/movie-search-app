import React from 'react';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  
  console.log('Movie data in card:', movie);
  
  const {
    Title: title = 'Movie Title',
    Year: year = 'N/A',
    Poster: poster = null,
    imdbID = '',
    Type: type = 'movie'
  } = movie;

  const posterUrl = poster && poster !== 'N/A' 
    ? poster 
    : 'https://via.placeholder.com/300x450/374151/9ca3af?text=No+Poster+Available';

  const handleCardClick = () => {
    if (imdbID) {
      navigate(`/movie/${imdbID}`);
    }
  };

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/300x450/374151/9ca3af?text=Image+Not+Found';
  };

  return (
    <div 
      className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
      onClick={handleCardClick}
    >
      <div className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 hover:border-blue-400/50 hover:shadow-xl hover:shadow-blue-400/20 min-h-[400px] flex flex-col">
        <div className="relative aspect-[2/3] overflow-hidden flex-shrink-0">
          <img
            src={posterUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
            onError={handleImageError}
          />
          
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
              View Details
            </button>
          </div>

          <div className="absolute top-2 right-2">
            <span className="bg-blue-500/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full uppercase font-medium">
              {type}
            </span>
          </div>
        </div>

        <div className="p-4 flex-grow flex flex-col justify-between">
          <div>
            <h3 className="text-white font-semibold text-lg mb-2 leading-tight group-hover:text-blue-300 transition-colors duration-200">
              {title}
            </h3>
          </div>
          
          <div className="flex items-center justify-between mt-auto">
            <span className="text-gray-300 text-sm font-medium">
              📅 {year}
            </span>
            
            {imdbID && (
              <span className="text-gray-400 text-xs font-mono bg-black/20 px-2 py-1 rounded">
                {imdbID.slice(0, 9)}...
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;