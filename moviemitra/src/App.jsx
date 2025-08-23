import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import Header from './components/Header';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';
import { MovieDetailErrorBoundary, ComponentErrorBoundary } from './components/ErrorBoundaries';

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <div className="min-h-screen w-screen bg-gradient-to-br from-blue-600 to-purple-700">
          <Header />

          <main className="px-4 md:px-8 py-12">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route 
                path="/movie/:id" 
                element={
                  <MovieDetailErrorBoundary>
                    <MovieDetail />
                  </MovieDetailErrorBoundary>
                } 
              />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </Router>
    </FavoritesProvider>
  );
}

export default App;