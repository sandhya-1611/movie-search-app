import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const movieDetails = {
    title: "The Dark Knight",
    year: "2008",
    rated: "PG-13",
    runtime: "152 min",
    genre: "Action, Crime, Drama",
    director: "Christopher Nolan",
    plot: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
    imdbRating: "9.0",
    imdbID: id
  };

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
              src={movieDetails.poster}
              alt={movieDetails.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="md:w-2/3 p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {movieDetails.title}
            </h1>

            <div className="flex flex-wrap gap-4 mb-6">
              <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                {movieDetails.year}
              </span>
              <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">
                {movieDetails.rated}
              </span>
              <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                {movieDetails.runtime}
              </span>
              <span className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-sm">
                ⭐ {movieDetails.imdbRating}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Genre</h3>
                <p className="text-gray-300">{movieDetails.genre}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Director</h3>
                <p className="text-gray-300">{movieDetails.director}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Plot</h3>
                <p className="text-gray-300 leading-relaxed">{movieDetails.plot}</p>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
                Add to Favorites
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