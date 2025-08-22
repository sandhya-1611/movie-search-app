import React from 'react';
import MovieCard from './MovieCard';

const MovieGrid = ({ movies, loading = false }) => {
  console.log('Movies in grid:', movies);

  const LoadingSkeleton = () => (
    <div className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 animate-pulse">
      <div className="aspect-[2/3] bg-gray-600/50"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-600/50 rounded mb-2"></div>
        <div className="h-3 bg-gray-600/50 rounded w-1/2"></div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {[...Array(10)].map((_, index) => (
          <LoadingSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🎬</div>
        <h3 className="text-2xl font-semibold text-white mb-2">No movies found</h3>
        <p className="text-gray-300">Try searching for a different movie title</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {movies.map((movie, index) => {

          if (!movie) {
            console.warn('Empty movie at index:', index);
            return null;
          }
          
          return (
            <MovieCard 
              key={movie.imdbID || `movie-${index}`} 
              movie={movie} 
            />
          );
        })}
      </div>
    </div>
  );
};

export default MovieGrid;