import React, { useState } from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log('Searching for:', query); 
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-blue-600 to-purple-700">
      <Header />
      
      <main className="px-4 md:px-8 py-12">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Discover Amazing Movies
            </h2>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Search and explore your favorite movies seamlessly on PC & mobile.
            </p>
          </div>

          <SearchBar onSearch={handleSearch} />

          <div className="mt-12">
            {searchQuery ? (
              <div className="text-center">
                <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <span className="text-white font-medium">
                    🔍 Search results for "{searchQuery}" will appear here soon!
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <span className="text-white font-medium">
                    Start typing to search for movies! 🎬
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App