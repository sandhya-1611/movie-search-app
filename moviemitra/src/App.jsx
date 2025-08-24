import React from 'react';
import { Routes, Route } from 'react-router-dom';
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
      <div className="min-h-screen bg-gray-900">
        <Header />

        <main className="w-full">
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
    </FavoritesProvider>
  );
}

export default App;
