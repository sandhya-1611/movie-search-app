import React, { useState, useEffect, useCallback } from "react";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import MovieGrid from "../components/MovieGrid";
import LoadingPlaceholder from "../components/LoadingPlaceholder";
import {
  SearchErrorBoundary,
  MovieGridErrorBoundary,
  ComponentErrorBoundary,
} from "../components/ErrorBoundaries";
import { searchMovies } from "../services/movieApi";
import { useDebounce } from "../hooks/useDebounce";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);

  const [filters, setFilters] = useState({
    type: "all",
    yearFrom: "",
    yearTo: "",
    sortBy: "relevance",
  });

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const performSearch = useCallback(
    async (term, page = 1, currentFilters = filters) => {
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
          setMovies((prev) =>
            page === 1 ? result.movies : [...prev, ...result.movies]
          );
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
        console.error("Search error:", err);
        setError("Something went wrong. Please try again.");
        setMovies([]);
        setTotalResults(0);
      } finally {
        setLoading(false);
      }
    },
    [filters]
  );

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
      type: "all",
      yearFrom: "",
      yearTo: "",
      sortBy: "relevance",
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

  const retrySearch = () => {
    if (searchTerm.trim()) {
      performSearch(searchTerm, 1);
    }
  };

  const resetSearch = () => {
    setSearchTerm("");
    setMovies([]);
    setError(null);
    setHasSearched(false);
    setTotalResults(0);
  };

  const hasMore = movies.length < totalResults && movies.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section with Search */}
      <div className="relative">
        <div className="max-w-4xl mx-auto px-4 pt-16 pb-8">
          {/* Welcome Section - Only show when not searched */}
          {!hasSearched && !loading && (
            <div className="text-center mb-12">
              <div className="mb-8">
                <div className="text-8xl mb-6 animate-pulse">🎬</div>
                <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                  Discover Your Next
                </h1>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-8 bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent">
                  Favorite Movie
                </h2>
                <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                  Search thousands of movies and TV shows, filter by your preferences, and save your favorites
                </p>
              </div>
            </div>
          )}

          {/* Search Section */}
          <div className="max-w-3xl mx-auto mb-8">
            <SearchErrorBoundary onRetry={resetSearch}>
              <div className="relative">
                <SearchBar
                  onSearch={handleSearchChange}
                  placeholder="Search for movies, TV series, episodes..."
                  className="w-full"
                />
              </div>
            </SearchErrorBoundary>
          </div>

          {/* Filter Section */}
          <div className="max-w-4xl mx-auto">
            <ComponentErrorBoundary
              componentName="FilterBar"
              onRetry={handleClearFilters}
            >
              <FilterBar
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onClearFilters={handleClearFilters}
              />
            </ComponentErrorBoundary>
          </div>
        </div>

        {/* Features Section - Only show when not searched */}
        {!hasSearched && !loading && (
          <div className="max-w-4xl mx-auto px-4 pb-16">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold text-white mb-2">Smart Search</h3>
                <p className="text-gray-400 text-sm">Find any movie or TV show instantly</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-lg font-semibold text-white mb-2">Advanced Filters</h3>
                <p className="text-gray-400 text-sm">Filter by type, year, and more</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="text-4xl mb-4">❤️</div>
                <h3 className="text-lg font-semibold text-white mb-2">Save Favorites</h3>
                <p className="text-gray-400 text-sm">Keep track of your favorite content</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="text-4xl mb-4">📱</div>
                <h3 className="text-lg font-semibold text-white mb-2">Responsive</h3>
                <p className="text-gray-400 text-sm">Perfect on any device</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Section */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        {hasSearched && !loading && (
          <div className="mb-8 text-center">
            {totalResults > 0 ? (
              <p className="text-gray-300 text-lg">
                Found{" "}
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 font-bold text-xl">
                  {totalResults.toLocaleString()}
                </span>{" "}
                results for{" "}
                <span className="text-blue-400 font-semibold text-xl">
                  "{searchTerm}"
                </span>
              </p>
            ) : (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-gray-400 text-xl">
                  No results found for{" "}
                  <span className="text-blue-400 font-semibold">"{searchTerm}"</span>
                </p>
                <p className="text-gray-500 mt-2">Try different keywords or adjust your filters</p>
              </div>
            )}
          </div>
        )}

        {loading && movies.length === 0 && (
          <ComponentErrorBoundary componentName="LoadingPlaceholder">
            <LoadingPlaceholder count={8} />
          </ComponentErrorBoundary>
        )}

        {error && !loading && (
          <div className="text-center py-16">
            <div className="text-8xl mb-6 animate-bounce">😞</div>
            <h2 className="text-3xl font-bold text-red-400 mb-6">
              Oops! Something went wrong
            </h2>
            <p className="text-gray-400 mb-8 text-lg max-w-md mx-auto">{error}</p>
            <button
              onClick={retrySearch}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl shadow-lg hover:scale-105 transition-all duration-300 font-semibold"
            >
              Try Again
            </button>
          </div>
        )}

        {movies.length > 0 && (
          <MovieGridErrorBoundary onRetry={retrySearch}>
            <MovieGrid movies={movies} />

            {hasMore && (
              <div className="text-center mt-16">
                <button
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="px-10 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg"
                >
                  {loading
                    ? "Loading..."
                    : `Load More (${movies.length} of ${totalResults})`}
                </button>
              </div>
            )}

            {loading && movies.length > 0 && (
              <ComponentErrorBoundary componentName="LoadingPlaceholder">
                <div className="mt-12">
                  <LoadingPlaceholder count={4} />
                </div>
              </ComponentErrorBoundary>
            )}
          </MovieGridErrorBoundary>
        )}
      </div>
    </div>
  );
};

export default Home;