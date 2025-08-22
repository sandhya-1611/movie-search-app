import React from 'react';

const MovieCard = ({ movie }) => {
  const {
    title = 'Movie Title',
    year = 'N/A',
    poster = null,
    imdbID = '',
    type = 'movie'
  } = movie;


  const posterUrl = poster && poster !== 'N/A' 
    ? poster 
    : 'https://via.placeholder.com/300x450/1f2937/9ca3af?text=No+Poster';

  const handleCardClick = () => {
    console.log('Movie clicked:', movie);
    
  };

  return (
    <div 
      className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
      onClick={handleCardClick}
    >
      <div className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 hover:border-blue-400/50 hover:shadow-xl hover:shadow-blue-400/20">

        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={posterUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
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

        <div className="p-4">
          <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors duration-200">
            {title}
          </h3>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-300 text-sm">
              📅 {year}
            </span>
            
            {imdbID && (
              <span className="text-gray-400 text-xs font-mono">
                ID: {imdbID}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;