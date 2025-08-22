import React from 'react'
import Header from './components/Header'

function App() {
  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-blue-600 to-purple-700">
      <Header />

      <main className="px-4 md:px-8 py-12 flex items-center justify-center min-h-[calc(100vh-120px)]">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Discover Amazing Movies
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 mb-8">
            Search and explore your favorite movies seamlessly on PC & mobile.
          </p>

          <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <span className="text-white font-medium">Search functionality coming next! 🚀</span>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App