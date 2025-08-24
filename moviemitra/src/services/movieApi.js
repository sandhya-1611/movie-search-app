const API_KEY = 'cfb5ab0447e1f2ecc65fcb3b6ab23246';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export const searchMovies = async (searchTerm, page = 1, filters = {}) => {
  if (!searchTerm?.trim()) {
    return {
      success: false,
      error: 'Search term is required'
    };
  }

  try {
    const endpoint = filters.type === 'movie' ? '/search/movie' : 
                    filters.type === 'tv' ? '/search/tv' : 
                    '/search/multi';
    
    const params = new URLSearchParams({
      api_key: API_KEY,
      query: searchTerm.trim(),
      page: page.toString()
    });

    if (filters.yearFrom) {
      if (filters.type === 'movie') {
        params.append('year', filters.yearFrom);
      } else if (filters.type === 'tv') {
        params.append('first_air_date_year', filters.yearFrom);
      }
    }

    const url = `${BASE_URL}${endpoint}?${params}`;
    console.log('🔍 TMDB API Request URL:', url);

    const response = await fetch(url);
    const data = await response.json();

    if (response.ok && data.results) {
      let movies = data.results.map(item => transformTmdbItem(item));
      
      movies = applyClientSideFilters(movies, filters);
      
      return {
        success: true,
        movies,
        totalResults: data.total_results || 0,
        currentPage: page,
        totalPages: data.total_pages || 1
      };
    } else {
      return {
        success: false,
        error: data.status_message || 'No results found',
        movies: [],
        totalResults: 0
      };
    }
  } catch (error) {
    console.error('TMDB search error:', error);
    return {
      success: false,
      error: 'Failed to search movies. Please try again.',
      movies: [],
      totalResults: 0
    };
  }
};

const transformTmdbItem = (item) => {
  const isMovie = item.media_type === 'movie' || item.title;
  const isTvShow = item.media_type === 'tv' || item.name;
  
  return {
    imdbID: item.id.toString(), 
    Title: item.title || item.name || 'Unknown Title',
    Year: isMovie ? 
      (item.release_date ? new Date(item.release_date).getFullYear().toString() : 'N/A') :
      (item.first_air_date ? new Date(item.first_air_date).getFullYear().toString() : 'N/A'),
    Type: isMovie ? 'movie' : isTvShow ? 'series' : 'movie',
    Poster: item.poster_path ? `${IMAGE_BASE_URL}${item.poster_path}` : 'N/A',
    tmdbId: item.id,
    overview: item.overview,
    rating: item.vote_average,
    popularity: item.popularity,
    backdrop: item.backdrop_path ? `https://image.tmdb.org/t/p/w1280${item.backdrop_path}` : null,
    releaseDate: item.release_date || item.first_air_date,
    originalTitle: item.original_title || item.original_name,
    adult: item.adult || false
  };
};

const applyClientSideFilters = (movies, filters) => {
  let filteredMovies = [...movies];

  if (filters.type && filters.type !== 'all') {
    const filterType = filters.type === 'series' ? 'series' : 'movie';
    filteredMovies = filteredMovies.filter(movie => movie.Type === filterType);
  }

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
      case 'rating':
        filteredMovies.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'popularity':
        filteredMovies.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        break;
      case 'relevance':
      default:
        break;
    }
  }

  return filteredMovies;
};

export const getMovieDetails = async (tmdbId, mediaType = 'movie') => {
  if (!tmdbId) {
    return {
      success: false,
      error: 'Movie/TV ID is required'
    };
  }

  try {
    const endpoint = mediaType === 'series' ? 'tv' : 'movie';
    const url = `${BASE_URL}/${endpoint}/${tmdbId}?api_key=${API_KEY}&append_to_response=credits,videos,similar`;
    
    console.log('🔍 TMDB Details Request:', url);

    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      const transformedData = {
        imdbID: data.id.toString(),
        Title: data.title || data.name,
        Year: data.release_date ? 
          new Date(data.release_date).getFullYear().toString() : 
          data.first_air_date ? new Date(data.first_air_date).getFullYear().toString() : 'N/A',
        Rated: data.adult ? 'R' : 'PG-13', 
        Released: data.release_date || data.first_air_date || 'N/A',
        Runtime: data.runtime ? `${data.runtime} min` : 
                 data.episode_run_time ? `${data.episode_run_time[0]} min` : 'N/A',
        Genre: data.genres ? data.genres.map(g => g.name).join(', ') : 'N/A',
        Director: data.credits?.crew?.find(person => person.job === 'Director')?.name || 'N/A',
        Writer: data.credits?.crew?.filter(person => person.job === 'Writer' || person.job === 'Screenplay')
                  .map(person => person.name).join(', ') || 'N/A',
        Actors: data.credits?.cast?.slice(0, 4).map(actor => actor.name).join(', ') || 'N/A',
        Plot: data.overview || 'No plot available.',
        Language: data.original_language ? data.original_language.toUpperCase() : 'EN',
        Country: data.production_countries?.map(c => c.name).join(', ') || 'N/A',
        Awards: 'N/A', 
        Poster: data.poster_path ? `${IMAGE_BASE_URL}${data.poster_path}` : 'N/A',
        Ratings: [
          {
            Source: "The Movie Database",
            Value: `${data.vote_average}/10`
          }
        ],
        Metascore: Math.round(data.vote_average * 10).toString(),
        imdbRating: data.vote_average?.toFixed(1) || 'N/A',
        imdbVotes: data.vote_count?.toLocaleString() || 'N/A',
        Type: mediaType === 'series' ? 'series' : 'movie',
        DVD: 'N/A',
        BoxOffice: data.revenue ? `$${data.revenue.toLocaleString()}` : 'N/A',
        Production: data.production_companies?.map(c => c.name).join(', ') || 'N/A',
        Website: data.homepage || 'N/A',
        Response: 'True',

        tmdbId: data.id,
        backdrop: data.backdrop_path ? `https://image.tmdb.org/t/p/w1280${data.backdrop_path}` : null,
        popularity: data.popularity,
        voteCount: data.vote_count,
        videos: data.videos?.results || [],
        similar: data.similar?.results?.slice(0, 6).map(item => transformTmdbItem(item)) || [],
        cast: data.credits?.cast?.slice(0, 10) || [],
        crew: data.credits?.crew || [],
        tagline: data.tagline,
        status: data.status,
        budget: data.budget,
        revenue: data.revenue,
        seasons: data.seasons || null 
      };

      return {
        success: true,
        movie: transformedData
      };
    } else {
      return {
        success: false,
        error: data.status_message || 'Movie/TV show not found'
      };
    }
  } catch (error) {
    console.error('TMDB details error:', error);
    return {
      success: false,
      error: 'Failed to load details. Please try again.'
    };
  }
};

export const getTrendingMovies = async (mediaType = 'all', timeWindow = 'week') => {
  try {
    const url = `${BASE_URL}/trending/${mediaType}/${timeWindow}?api_key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        movies: data.results.map(item => transformTmdbItem(item))
      };
    } else {
      return {
        success: false,
        error: data.status_message || 'Failed to get trending content'
      };
    }
  } catch (error) {
    console.error('Trending movies error:', error);
    return {
      success: false,
      error: 'Failed to load trending content.'
    };
  }
};

export const getPopularMovies = async (mediaType = 'movie', page = 1) => {
  try {
    const url = `${BASE_URL}/${mediaType}/popular?api_key=${API_KEY}&page=${page}`;
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        movies: data.results.map(item => transformTmdbItem(item)),
        totalPages: data.total_pages,
        currentPage: page
      };
    } else {
      return {
        success: false,
        error: data.status_message || 'Failed to get popular content'
      };
    }
  } catch (error) {
    console.error('Popular movies error:', error);
    return {
      success: false,
      error: 'Failed to load popular content.'
    };
  }
};

export const discoverMovies = async (filters = {}, page = 1) => {
  try {
    const mediaType = filters.type === 'series' ? 'tv' : 'movie';
    const params = new URLSearchParams({
      api_key: API_KEY,
      page: page.toString(),
      sort_by: filters.sortBy === 'rating' ? 'vote_average.desc' : 
               filters.sortBy === 'popularity' ? 'popularity.desc' : 
               filters.sortBy === 'year_desc' ? 'release_date.desc' : 
               'popularity.desc'
    });

    if (filters.yearFrom) {
      if (mediaType === 'movie') {
        params.append('primary_release_year', filters.yearFrom);
      } else {
        params.append('first_air_date_year', filters.yearFrom);
      }
    }

    if (filters.genre) {
      params.append('with_genres', filters.genre);
    }

    if (filters.minRating) {
      params.append('vote_average.gte', filters.minRating);
    }

    const url = `${BASE_URL}/discover/${mediaType}?${params}`;
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        movies: data.results.map(item => transformTmdbItem(item)),
        totalResults: data.total_results,
        totalPages: data.total_pages,
        currentPage: page
      };
    } else {
      return {
        success: false,
        error: data.status_message || 'Failed to discover content'
      };
    }
  } catch (error) {
    console.error('Discover movies error:', error);
    return {
      success: false,
      error: 'Failed to discover content.'
    };
  }
};

export const buildSearchUrl = (searchTerm, page, filters) => {
  const endpoint = filters.type === 'movie' ? '/search/movie' : 
                  filters.type === 'series' ? '/search/tv' : 
                  '/search/multi';
  
  const params = new URLSearchParams({
    api_key: API_KEY,
    query: searchTerm,
    page: page.toString()
  });

  if (filters.yearFrom) {
    if (filters.type === 'movie') {
      params.append('year', filters.yearFrom);
    } else if (filters.type === 'series') {
      params.append('first_air_date_year', filters.yearFrom);
    }
  }

  return `${BASE_URL}${endpoint}?${params}`;
};