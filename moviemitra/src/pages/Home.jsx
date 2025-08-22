import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import MovieGrid from '../components/MovieGrid';
import { searchMovies } from '../services/movieApi';
import useDebounce from '../hooks/useDebounce';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    if (debouncedSearchQuery.length > 2) {
      handleSearch(debouncedSearchQuery, 1);
    } else {
      setMovies([]);
      setError(null);
      setTotalResults(0);
    }
  }, [debouncedSearchQuery]);

  const handleSearch = async (query, page = 1) => {
    if (!query || query.length < 3) return;

    setLoading(true);
    setError(null);

    const result = await searchMovies(query, page);

    // In the handleSearch function, after const result = await searchMovies(query, page);
    console.log('API Response:', result);

    if (result.success) {
      console.log('Movies received:', result.movies);
      setMovies(page === 1 ? result.movies : [...movies, ...result.movies]);
      setTotalResults(result.totalResults);
      setCurrentPage(page);
    } else {
      console.error('API Error:', result.error);
      setError(result.error);
      setMovies([]);
      setTotalResults(0);
}
    if (result.success) {
      setMovies(page === 1 ? result.movies : [...movies, ...result.movies]);
      setTotalResults(result.totalResults);
      setCurrentPage(page);
    } else {
      setError(result.error);
      setMovies([]);
      setTotalResults(0);
    }

    setLoading(false);
  };

  const handleSearchInput = (query) => {
    setSearchQuery(query);
    if (query.length === 0) {
      setMovies([]);
      setError(null);
      setTotalResults(0);
    }
  };

  const loadMoreMovies = () => {
    if (debouncedSearchQuery.length > 2 && !loading) {
      handleSearch(debouncedSearchQuery, currentPage + 1);
    }
  };

  const hasMoreMovies = totalResults > movies.length;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Discover Amazing Movies
        </h2>
        <p className="text-xl md:text-2xl text-gray-200 mb-8">
          Search and explore your favorite movies seamlessly on PC & mobile.
        </p>
      </div>

      <SearchBar onSearch={handleSearchInput} />

      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
          <p className="text-red-300 text-center">{error}</p>
        </div>
      )}


      <div className="mt-8">
        {searchQuery ? (
          <div>
            {!loading && movies.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">
                  Search Results for "{searchQuery}"
                </h3>
                <p className="text-gray-300">
                  Showing {movies.length} of {totalResults} movies
                </p>
              </div>
            )}

            <MovieGrid movies={movies} loading={loading && currentPage === 1} />

            {hasMoreMovies && !loading && movies.length > 0 && (
              <div className="text-center mt-8">
                <button
                  onClick={loadMoreMovies}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  Load More Movies
                </button>
              </div>
            )}

            {loading && currentPage > 1 && (
              <div className="text-center mt-8">
                <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400 mr-3"></div>
                  <span className="text-white">Loading more movies...</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-2xl font-semibold text-white mb-2">Ready to explore?</h3>
            <p className="text-gray-300">Start typing in the search bar to find amazing movies!</p>
            <p className="text-sm text-gray-400 mt-2">Search for at least 3 characters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;