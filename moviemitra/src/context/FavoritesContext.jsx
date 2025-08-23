import React, { createContext, useContext } from 'react';
import useFavorites from '../hooks/useFavorites';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const favoritesData = useFavorites();

  return (
    <FavoritesContext.Provider value={favoritesData}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavoritesContext = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavoritesContext must be used within a FavoritesProvider');
  }
  return context;
};