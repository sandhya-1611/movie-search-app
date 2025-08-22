const API_KEY = '58198ac7'
const BASE_URL = 'https://www.omdbapi.com/';

export const searchMovies = async (searchTerm, page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}&page=${page}`
    );
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    
    if (data.Response === 'False') {
      return {
        success: false,
        error: data.Error,
        movies: [],
        totalResults: 0
      };
    }
    
    return {
      success: true,
      movies: data.Search || [],
      totalResults: parseInt(data.totalResults) || 0,
      error: null
    };
  } catch (error) {
    console.error('Error searching movies:', error);
    return {
      success: false,
      error: 'Failed to fetch movies. Please try again.',
      movies: [],
      totalResults: 0
    };
  }
};

export const getMovieDetails = async (imdbID) => {
  try {
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`
    );
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    
    if (data.Response === 'False') {
      return {
        success: false,
        error: data.Error,
        movie: null
      };
    }
    
    return {
      success: true,
      movie: data,
      error: null
    };
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return {
      success: false,
      error: 'Failed to fetch movie details. Please try again.',
      movie: null
    };
  }
};