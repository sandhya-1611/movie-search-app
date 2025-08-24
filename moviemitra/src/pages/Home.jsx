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
import { Link } from "react-router-dom";
import Features from "../components/Features";
import { Search, Filter, Heart, Smartphone } from "react-feather"; 

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
      let result = await searchMovies(term, page, currentFilters);

      if (result.success) {
        let fetchedMovies = result.movies;
      if (currentFilters.ratings) {
        const ratingValue = parseFloat(currentFilters.ratings);

        fetchedMovies = fetchedMovies.filter((movie) => {
          const rawRating = movie.imdbRating || "";
          const match = String(rawRating).match(/[\d.]+/);
          if (!match) return true; 
          const numericRating = parseFloat(match[0]);
          return numericRating >= ratingValue;
        });
      }



        if (currentFilters.sortBy === "yearAsc") {
          fetchedMovies.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
        } else if (currentFilters.sortBy === "yearDesc") {
          fetchedMovies.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
        }

        setMovies((prev) =>
          page === 1 ? fetchedMovies : [...prev, ...fetchedMovies]
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

    if (!term.trim()) {
      setMovies([]);
      setError(null);
      setHasSearched(false);
      setTotalResults(0);
    }
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
    <main
      style={{
        width: "100%",
        background: "linear-gradient(135deg, #0b1220 0%, #0f172a 50%, #0b1220 100%)",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="max-w-4xl mx-auto px-4 pt-16 pb-8">
        {!hasSearched && !loading && (
          <div className="text-center mb-12">
            <div className="mb-8">
              <div className="flex flex-col items-center justify-center mb-12">
                <Link to="/" className="flex items-center space-x-2 animate-pulse">
                  <span className="text-9xl">🎬</span>
                  <h1 className="text-18xl md:text-5xl font-extrabold tracking-wide font-sans text-white">
                    Movie<span className="text-blue-500">Mitra</span>
                  </h1>
                </Link>
              </div>
              <h1
                className="text-5xl md:text-6xl font-extrabold mb-6"
                style={{ color: "#C0A1D9" }}
              >
                Discover Your Next
              </h1>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-8 bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent"style={{ color: "#C0A1D9",marginBottom:'1rem' }}>
                Favorite Movie
              </h2>
              <p
                className="text-xxl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
                style={{ color: "#E9D8FD",marginBottom:'1rem' }}
              >
                Search thousands of movies and TV shows, filter by your
                preferences, and save your favorites
              </p>
            </div>
          </div>
        )}

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

{!hasSearched && !loading && (
  <section
    style={{
      width: "100%",
      paddingTop: "2rem",
      paddingBottom: "4rem",  
    }}
  >
    <div className="max-w-6xl mx-auto px-6">
      <h2
        className="text-center text-3xl font-bold mb-16"  
        style={{
          background: "linear-gradient(90deg, #a78bfa, #f0abfc)",
          WebkitBackgroundClip: "text",
          color: "transparent",
          marginBottom: '2rem'
        }}
      >
        ✨ Why Choose MovieMitra
      </h2>

      <div id="features-grid">
        <div className="feature-card border-pink-500 shadow-[0_0_12px_rgba(236,72,153,0.7)] hover:shadow-[0_0_25px_rgba(236,72,153,1)]">
          <div className="mb-4">
            <Search size={40} className="text-pink-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-white">Smart Search</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            Find any movie or TV show instantly with our powerful search engine and comprehensive database.
          </p>
        </div>

        <div className="feature-card border-cyan-500 shadow-[0_0_12px_rgba(34,211,238,0.7)] hover:shadow-[0_0_25px_rgba(34,211,238,1)]">
          <div className="mb-4">
            <Filter size={40} className="text-cyan-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-white">Advanced Filters</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            Filter by type, year, genre, and rating to discover exactly what you're looking for.
          </p>
        </div>

        <div className="feature-card border-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.7)] hover:shadow-[0_0_25px_rgba(244,63,94,1)]">
          <div className="mb-4">
            <Heart size={40} className="text-rose-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-white">Save Favorites</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            Create your personal watchlist and keep track of your favorite movies and shows.
          </p>
        </div>

        <div className="feature-card border-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.7)] hover:shadow-[0_0_25px_rgba(16,185,129,1)]">
          <div className="mb-4">
            <Smartphone size={40} className="text-emerald-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-white">Responsive Design</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            Seamless experience across all devices - desktop, tablet, and mobile platforms.
          </p>
        </div>
      </div>

      <style>{`
        #features-grid {
          display: grid;
          grid-template-columns: 1fr;   
          gap: 32px;   
          padding: 0 40px; 
        }
        @media (min-width: 1024px) {
          #features-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)); 
          }
        }

        .feature-card {
          background: #0d1117;
          border-width: 2px;
          border-radius: 12px;
          padding: 20px;   
          text-align: center;
          transition: all .3s ease;
        }
        .feature-card:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  </section>
)}

      <div className="max-w-6xl mx-auto px-4 pb-16">
        {hasSearched && !loading && searchTerm.trim() !== "" && (
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
                  <span className="text-blue-400 font-semibold">
                    "{searchTerm}"
                  </span>
                </p>
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
    </main>
  );
};

export default Home;
