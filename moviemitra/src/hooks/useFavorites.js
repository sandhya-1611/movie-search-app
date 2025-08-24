import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'moviemitra-favorites';

const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

useEffect(() => {
  console.log('💾 Saving favorites to localStorage:', favorites);
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('❌ Error saving favorites:', error);
  }
}, [favorites]);



  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  }, [favorites]);

  const addToFavorites = (movie) => {
    setFavorites((prevFavorites) => {
      if (!prevFavorites.some(fav => fav.imdbID === movie.imdbID)) {
        return [...prevFavorites, movie];
      }
      return prevFavorites;
    });
  };

  const removeFromFavorites = (imdbID) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((movie) => movie.imdbID !== imdbID)
    );
  };

  const clearFavorites = () => {
  setFavorites([]); 
};


  const isFavorite = (imdbID) => favorites.some(movie => movie.imdbID === imdbID);

  const toggleFavorite = (movie) => {
    if (isFavorite(movie.imdbID)) {
      removeFromFavorites(movie.imdbID);
    } else {
      addToFavorites(movie);
    }
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    clearFavorites, 
    isFavorite,
    toggleFavorite
  };
};

export default useFavorites;
