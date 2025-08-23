import React, { useState } from 'react';

const FilterBar = ({ filters, onFiltersChange, onClearFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear; year >= 1900; year--) {
    years.push(year);
  }

  const handleFilterChange = (filterType, value) => {
    const newFilters = {
      ...filters,
      [filterType]: value
    };
    onFiltersChange(newFilters);
  };

  const handleClearFilters = () => {
    onClearFilters();
    setIsExpanded(false);
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    value && value !== '' && value !== 'all'
  );

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 mb-6">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-2 text-white hover:text-blue-300 transition-colors duration-200"
          >
            <svg 
              className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="font-medium">Filters</span>
          </button>

          {hasActiveFilters && (
            <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full text-sm">
              {Object.values(filters).filter(value => value && value !== '' && value !== 'all').length} active
            </span>
          )}
        </div>

        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors duration-200"
          >
            Clear All
          </button>
        )}
      </div>

      {isExpanded && (
        <div className="px-4 pb-4 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Type
              </label>
              <select
                value={filters.type || 'all'}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="movie">Movies</option>
                <option value="series">TV Series</option>
                <option value="episode">Episodes</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                From Year
              </label>
              <select
                value={filters.yearFrom || ''}
                onChange={(e) => handleFilterChange('yearFrom', e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Any Year</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                To Year
              </label>
              <select
                value={filters.yearTo || ''}
                onChange={(e) => handleFilterChange('yearTo', e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Any Year</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Sort By
              </label>
              <select
                value={filters.sortBy || 'relevance'}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="relevance">Relevance</option>
                <option value="year_desc">Year (Newest)</option>
                <option value="year_asc">Year (Oldest)</option>
                <option value="title">Title (A-Z)</option>
              </select>
            </div>
          </div>

          {hasActiveFilters && (
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-gray-300">Active filters:</span>
                
                {filters.type && filters.type !== 'all' && (
                  <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full text-sm flex items-center">
                    Type: {filters.type}
                    <button
                      onClick={() => handleFilterChange('type', 'all')}
                      className="ml-2 text-blue-300 hover:text-white"
                    >
                      ×
                    </button>
                  </span>
                )}

                {filters.yearFrom && (
                  <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded-full text-sm flex items-center">
                    From: {filters.yearFrom}
                    <button
                      onClick={() => handleFilterChange('yearFrom', '')}
                      className="ml-2 text-green-300 hover:text-white"
                    >
                      ×
                    </button>
                  </span>
                )}

                {filters.yearTo && (
                  <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded-full text-sm flex items-center">
                    To: {filters.yearTo}
                    <button
                      onClick={() => handleFilterChange('yearTo', '')}
                      className="ml-2 text-green-300 hover:text-white"
                    >
                      ×
                    </button>
                  </span>
                )}

                {filters.sortBy && filters.sortBy !== 'relevance' && (
                  <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-sm flex items-center">
                    Sort: {filters.sortBy.replace('_', ' ')}
                    <button
                      onClick={() => handleFilterChange('sortBy', 'relevance')}
                      className="ml-2 text-purple-300 hover:text-white"
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterBar;