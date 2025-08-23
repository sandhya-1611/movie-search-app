import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import MovieGrid from '../components/MovieGrid';
import LoadingPlaceholder from '../components/LoadingPlaceholder';
import { searchMovies } from '../services/movieApi';
import { useDebounce } from '../hooks/useDebounce';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);

  const [filters, setFilters] = useState({
    type: 'all',
    yearFrom: '',
    yearTo: '',
    sortBy: 'relevance'
  });

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const performSearch = useCallback(async (term, page = 1, currentFilters = filters) => {
    if (!term?.trim()) {
      setMovies([]);
      setTotalResults(0);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await searchMovies(term, page, currentFilters);
      
      if (result.success) {
        if (page === 1) {
          setMovies(result.movies);
        } else {
          setMovies(prev => [...prev, ...result.movies]);
        }
        setTotalResults(result.totalResults);
        setCurrentPage(page);
        setHasSearched(true);
      } else {
        setMovies([]);
        setError(result.error);
        setTotalResults(0);
        setHasSearched(true);
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Something went wrong. Please try again.');
      setMovies([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      performSearch(debouncedSearchTerm, 1);
    }
  }, [debouncedSearchTerm, performSearch]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    
    if (searchTerm.trim()) {
      performSearch(searchTerm, 1, newFilters);
    }
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      type: 'all',
      yearFrom: '',
      yearTo: '',
      sortBy: 'relevance'
    };
    setFilters(clearedFilters);
    setCurrentPage(1);
    
    if (searchTerm.trim()) {
      performSearch(searchTerm, 1, clearedFilters);
    }
  };

  const handleLoadMore = () => {
    if (!loading && searchTerm.trim()) {
      performSearch(searchTerm, currentPage + 1);
    }
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const hasMore = movies.length < totalResults && movies.length > 0;

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        
        <SearchBar 
          onSearch={handleSearchChange}
          placeholder="Search for movies, TV series, episodes..."
          className="mb-6"
        />
        
        <FilterBar 
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onClearFilters={handleClearFilters}
        />

        {hasSearched && !loading && (
          <div className="mb-6">
            {totalResults > 0 ? (
              <div className="flex items-center justify-between">
                <p className="text-gray-300">
                  Found <span className="text-white font-semibold">{totalResults.toLocaleString()}</span> results
                  {searchTerm && <span> for "<span className="text-blue-300">{searchTerm}</span>"</span>}
                </p>
                
                {(filters.type !== 'all' || filters.yearFrom || filters.yearTo || filters.sortBy !== 'relevance') && (
                  <div className="text-sm text-gray-400">
                    Filtered results
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-300">
                No results found
                {searchTerm && <span> for "<span className="text-blue-300">{searchTerm}</span>"</span>}
              </p>
            )}
          </div>
        )}

        {loading && movies.length === 0 && (
          <LoadingPlaceholder count={8} />
        )}

        {error && !loading && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">😞</div>
            <h2 className="text-2xl font-semibold text-white mb-4">Oops! Something went wrong</h2>
            <p className="text-gray-300 mb-8">{error}</p>
            <button
              onClick={() => performSearch(searchTerm, 1)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        )}

        {movies.length > 0 && (
          <>
            <MovieGrid movies={movies} />
            
            {hasMore && (
              <div className="text-center mt-12">
                <button
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  {loading ? 'Loading...' : `Load More (${movies.length} of ${totalResults})`}
                </button>
              </div>
            )}

            {loading && movies.length > 0 && (
              <div className="mt-8">
                <LoadingPlaceholder count={4} />
              </div>
            )}
          </>
        )}

        {!hasSearched && !loading && (
          <div className="text-center py-16">
            <div className="text-8xl mb-6">🎬</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Welcome to <span className="text-blue-400">MovieMitra</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Discover your next favorite movie or TV series
            </p>
            <div className="max-w-md mx-auto text-gray-400">
              <p className="mb-2">🔍 Search thousands of movies and TV shows</p>
              <p className="mb-2">⚡ Filter by type, year, and more</p>
              <p className="mb-2">❤️ Save your favorites</p>
              <p>📱 Responsive design for all devices</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;