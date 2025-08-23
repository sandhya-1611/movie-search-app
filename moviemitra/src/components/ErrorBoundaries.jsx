import React from 'react';
import ErrorBoundary from './ErrorBoundary';

export const MovieGridErrorBoundary = ({ children, onRetry }) => (
  <ErrorBoundary
    title="Unable to load movies"
    message="There was a problem displaying the movie results. This might be due to a network issue or data formatting problem."
    onRetry={onRetry}
    fallback={
      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8 text-center">
        <div className="text-6xl mb-4">🎬</div>
        <h3 className="text-xl font-semibold text-white mb-4">Movies temporarily unavailable</h3>
        <p className="text-gray-300 mb-6">We're having trouble loading the movie results right now.</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={onRetry}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Retry Search
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Back to Home
          </button>
        </div>
      </div>
    }
  >
    {children}
  </ErrorBoundary>
);

export const MovieDetailErrorBoundary = ({ children, onRetry }) => (
  <ErrorBoundary
    title="Unable to load movie details"
    message="We couldn't load the details for this movie. This might be due to a network issue or the movie data being unavailable."
    onRetry={onRetry}
    fallback={
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8 text-center">
          <div className="text-6xl mb-4">📽️</div>
          <h3 className="text-xl font-semibold text-white mb-4">Movie details unavailable</h3>
          <p className="text-gray-300 mb-6">We couldn't load the details for this movie.</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={onRetry}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Try Again
            </button>
            <button
              onClick={() => window.history.back()}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    }
  >
    {children}
  </ErrorBoundary>
);

export const SearchErrorBoundary = ({ children, onRetry }) => (
  <ErrorBoundary
    title="Search temporarily unavailable"
    message="We're experiencing issues with the search functionality. Please try again in a moment."
    onRetry={onRetry}
    fallback={
      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 text-center">
        <div className="text-4xl mb-3">🔍</div>
        <h4 className="text-lg font-semibold text-white mb-3">Search Error</h4>
        <p className="text-gray-300 mb-4 text-sm">
          The search component encountered an error.
        </p>
        <button
          onClick={onRetry}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
        >
          Reset Search
        </button>
      </div>
    }
  >
    {children}
  </ErrorBoundary>
);

export const FavoritesErrorBoundary = ({ children, onRetry }) => (
  <ErrorBoundary
    title="Favorites temporarily unavailable"
    message="We're having trouble loading your favorites. Your saved movies are safe and will be restored shortly."
    onRetry={onRetry}
    fallback={
      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8 text-center">
        <div className="text-6xl mb-4">❤️</div>
        <h3 className="text-xl font-semibold text-white mb-4">Favorites Error</h3>
        <p className="text-gray-300 mb-6">
          We couldn't load your favorites right now, but don't worry - your saved movies are safe.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={onRetry}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Reload Favorites
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Back to Search
          </button>
        </div>
      </div>
    }
  >
    {children}
  </ErrorBoundary>
);

export const ComponentErrorBoundary = ({ children, componentName, onRetry }) => (
  <ErrorBoundary
    title={`${componentName} Error`}
    message={`The ${componentName} component encountered an error.`}
    onRetry={onRetry}
    fallback={
      <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 text-center">
        <div className="text-2xl mb-2">⚠️</div>
        <p className="text-red-300 text-sm mb-3">
          {componentName} failed to load
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-medium transition-colors duration-200"
          >
            Retry
          </button>
        )}
      </div>
    }
  >
    {children}
  </ErrorBoundary>
);