const API_KEY = '58198ac7'
const BASE_URL = 'https://www.omdbapi.com/';

export const searchMovies = async (searchTerm, page = 1, filters = {}) => {
  if (!searchTerm?.trim()) {
    return {
      success: false,
      error: 'Search term is required'
    };
  }

  try {
    const params = new URLSearchParams({
      apikey: API_KEY,
      s: searchTerm.trim(),
      page: page.toString()
    });

    if (filters.type && filters.type !== 'all') {
      params.append('type', filters.type);
    }

    if (filters.yearFrom || filters.yearTo) {
      if (filters.yearFrom && filters.yearTo) {
        params.append('y', filters.yearFrom);
      } else if (filters.yearFrom) {
        params.append('y', filters.yearFrom);
      } else if (filters.yearTo) {
        params.append('y', filters.yearTo);
      }
    }

    const url = `${BASE_URL}?${params}`;
    console.log('🔍 API Request URL:', url);

    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === 'True') {
      let movies = data.Search || [];
      
      movies = applyClientSideFilters(movies, filters);
      
      return {
        success: true,
        movies,
        totalResults: parseInt(data.totalResults) || 0,
        currentPage: page
      };
    } else {
      return {
        success: false,
        error: data.Error || 'No movies found',
        movies: [],
        totalResults: 0
      };
    }
  } catch (error) {
    console.error('Movie search error:', error);
    return {
      success: false,
      error: 'Failed to search movies. Please try again.',
      movies: [],
      totalResults: 0
    };
  }
};

const applyClientSideFilters = (movies, filters) => {
  let filteredMovies = [...movies];

  if (filters.yearFrom || filters.yearTo) {
    filteredMovies = filteredMovies.filter(movie => {
      const movieYear = parseInt(movie.Year);
      if (isNaN(movieYear)) return true; 
      
      if (filters.yearFrom && movieYear < parseInt(filters.yearFrom)) return false;
      if (filters.yearTo && movieYear > parseInt(filters.yearTo)) return false;
      return true;
    });
  }

  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'year_desc':
        filteredMovies.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
        break;
      case 'year_asc':
        filteredMovies.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
        break;
      case 'title':
        filteredMovies.sort((a, b) => a.Title.localeCompare(b.Title));
        break;
      case 'relevance':
      default:
        break;
    }
  }

  return filteredMovies;
};

export const getMovieDetails = async (imdbId) => {
  if (!imdbId) {
    return {
      success: false,
      error: 'Movie ID is required'
    };
  }

  try {
    const url = `${BASE_URL}?apikey=${API_KEY}&i=${imdbId}&plot=full`;
    console.log('🔍 Movie Details Request:', url);

    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === 'True') {
      return {
        success: true,
        movie: data
      };
    } else {
      return {
        success: false,
        error: data.Error || 'Movie not found'
      };
    }
  } catch (error) {
    console.error('Movie details error:', error);
    return {
      success: false,
      error: 'Failed to load movie details. Please try again.'
    };
  }
};

export const buildSearchUrl = (searchTerm, page, filters) => {
  const params = new URLSearchParams({
    apikey: API_KEY,
    s: searchTerm,
    page: page.toString()
  });

  if (filters.type && filters.type !== 'all') {
    params.append('type', filters.type);
  }

  if (filters.yearFrom) {
    params.append('y', filters.yearFrom);
  }

  return `${BASE_URL}?${params}`;
};