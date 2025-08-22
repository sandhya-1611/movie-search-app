import React, { useState } from 'react';

const SearchBar = ({ onSearch, placeholder = "Search for movies..." }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className={`relative flex items-center bg-white/10 backdrop-blur-md rounded-2xl border transition-all duration-300 ${
        isFocused ? 'border-blue-400 shadow-lg shadow-blue-400/25 scale-105' : 'border-white/20'
      }`}>

        <div className="absolute left-4">
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>


        <input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full pl-12 pr-12 py-4 bg-transparent text-white placeholder-gray-400 focus:outline-none text-lg rounded-2xl"
        />

        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-4 p-1 rounded-full hover:bg-white/10 transition-colors duration-200"
          >
            <svg className="h-4 w-4 text-gray-400 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>


      {searchQuery && (
        <div className="mt-2 text-center">
          <span className="text-sm text-gray-300">
            Searching for "{searchQuery}"...
          </span>
        </div>
      )}
    </div>
  );
};

export default SearchBar;