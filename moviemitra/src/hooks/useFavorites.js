import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'moviemitra-favorites';

const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    console.log('🧪 Testing localStorage availability...');
    try {

      const testKey = 'test-key';
      localStorage.setItem(testKey, 'test-value');
      const testValue = localStorage.getItem(testKey);
      localStorage.removeItem(testKey);
      console.log('✅ localStorage is working, test value:', testValue);
    } catch (error) {
      console.error('❌ localStorage is not available:', error);
    }
  }, []);

  useEffect(() => {
    console.log('🔍 Loading favorites from localStorage...');
    try {
      const storedFavorites = localStorage.getItem(FAVORITES_KEY);
      console.log('📦 Raw stored data:', storedFavorites);
      
      if (storedFavorites) {
        const parsedFavorites = JSON.parse(storedFavorites);
        console.log('✅ Parsed favorites:', parsedFavorites);
        setFavorites(parsedFavorites);
      } else {
        console.log('📭 No favorites found in localStorage');
      }
    } catch (error) {
      console.error('❌ Error loading favorites:', error);
      setFavorites([]);
    }
  }, []);

  useEffect(() => {

    if (favorites.length === 0) {
      console.log('⏭️ Skipping save - favorites array is empty');
      return;
    }

    console.log('💾 Saving favorites to localStorage:', favorites);
    try {
      const jsonString = JSON.stringify(favorites);
      console.log('📝 JSON string to save:', jsonString);
      
      localStorage.setItem(FAVORITES_KEY, jsonString);
      
      const saved = localStorage.getItem(FAVORITES_KEY);
      console.log('✅ Verified saved data:', saved);
      console.log('🔍 Are they equal?', jsonString === saved);
    } catch (error) {
      console.error('❌ Error saving favorites:', error);
    }
  }, [favorites]);

  const addToFavorites = (movie) => {
    console.log('➕ Adding to favorites:', movie);
    setFavorites(prevFavorites => {
      const isAlreadyFavorite = prevFavorites.some(fav => fav.imdbID === movie.imdbID);
      if (!isAlreadyFavorite) {
        const newFavorites = [...prevFavorites, movie];
        console.log('✅ New favorites list:', newFavorites);
        return newFavorites;
      }
      console.log('⚠️ Movie already in favorites');
      return prevFavorites;
    });
  };

  const removeFromFavorites = (imdbID) => {
    console.log('➖ Removing from favorites:', imdbID);
    setFavorites(prevFavorites => {
      const newFavorites = prevFavorites.filter(movie => movie.imdbID !== imdbID);
      console.log('✅ New favorites list after removal:', newFavorites);
      return newFavorites;
    });
  };

  const isFavorite = (imdbID) => {
    const result = favorites.some(movie => movie.imdbID === imdbID);
    console.log(`🔍 Is ${imdbID} a favorite?`, result);
    return result;
  };

  const toggleFavorite = (movie) => {
    console.log('🔄 Toggling favorite for:', movie);
    if (isFavorite(movie.imdbID)) {
      removeFromFavorites(movie.imdbID);
    } else {
      addToFavorites(movie);
    }
  };

  console.log('📊 Current favorites state:', favorites);

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite
  };
};

export default useFavorites;