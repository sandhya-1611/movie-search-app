import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className="min-h-screen w-screen bg-gradient-to-br from-blue-600 to-purple-700">
        <Header />

        <main className="px-4 md:px-8 py-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;