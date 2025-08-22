import React, { useState } from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import MovieGrid from './components/MovieGrid'

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const sampleMovies = [
    {
      title: "The Dark Knight",
      year: "2008",
      imdbID: "tt0468569",
      type: "movie",
      poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg"
    },
    {
      title: "Inception",
      year: "2010", 
      imdbID: "tt1375666",
      type: "movie",
      poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg"
    },
    {
      title: "Interstellar",
      year: "2014",
      imdbID: "tt0816692", 
      type: "movie",
      poster: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"
    }
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
    
    if (query.length > 0) {
      setLoading(true);
      setTimeout(() => {
        const filteredMovies = query.length > 2 ? sampleMovies : [];
        setMovies(filteredMovies);
        setLoading(false);
      }, 500);
    } else {
      setMovies([]);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-blue-600 to-purple-700">
      <Header />

      <main className="px-4 md:px-8 py-12">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Discover Amazing Movies
            </h2>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Search and explore your favorite movies seamlessly on PC & mobile.
            </p>
          </div>

          <SearchBar onSearch={handleSearch} />

          <div className="mt-8">
            {searchQuery ? (
              <div>
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {loading ? 'Searching...' : `Search Results for "${searchQuery}"`}
                  </h3>
                  {!loading && movies.length > 0 && (
                    <p className="text-gray-300">Found {movies.length} movies</p>
                  )}
                </div>
                <MovieGrid movies={movies} loading={loading} />
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🎬</div>
                <h3 className="text-2xl font-semibold text-white mb-2">Ready to explore?</h3>
                <p className="text-gray-300">Start typing in the search bar to find amazing movies!</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App