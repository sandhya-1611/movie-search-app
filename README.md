# movie-search-app
🎬 MovieMitra – Movie Search Application

MovieMitra is a responsive movie search application built with React.js and Vite.
It integrates with the TMDB API to allow users to search for movies, filter results, view details, and manage their favorite movies.

🚀 Features

    🔍 Search Movies – Search interface with debounced input

    🎞 Grid/List Display – Shows search results in a responsive grid

    📝 Basic Info – Title, year, and poster displayed for each movie

    📖 Movie Details – Dedicated detail page with extended info

    📜 Pagination / Infinite Scroll – Browse through large results easily

    ⏳ Loading Placeholders – Skeleton loaders for better UX

    ⚠️ Error Handling – Displays error messages for failed API calls

    💖 Favorites – Save movies locally using localStorage

    🧩 Filters – Filter by year, rating, etc. (optional feature)

    🌍 Responsive Design – Works seamlessly on desktop & mobile

🛠 Tech Stack

    React.js (with hooks + functional components)

    Vite (for fast dev & build)

    React Router (for navigation)

    TMDB API (for movies data)

    TailwindCSS (for responsive styling)

📂 Project Structure
```plaintext
src/
├── assets/                 # Static assets
├── components/             # Reusable UI components
│   ├── ErrorBoundaries.jsx
│   ├── FilterBar.jsx
│   ├── Header.jsx
│   ├── LoadingPlaceholder.jsx
│   ├── MovieCard.jsx
│   ├── MovieGrid.jsx
│   ├── SearchBar.jsx
│
├── context/                # Global state (Favorites context)
│   └── FavoritesContext.jsx
│
├── hooks/                  # Custom React hooks
│   ├── useDebounce.js
│   └── useFavorites.js
│
├── pages/                  # Application pages
│   ├── Home.jsx
│   ├── MovieDetail.jsx
│   ├── Favorites.jsx
│   └── NotFound.jsx
│
├── services/               # API integration
│   └── movieApi.js
│
├── App.jsx                 # Root component
├── main.jsx                # Entry point
├── App.css / index.css     # Styles

    ⚙️ Setup Instructions
    1️⃣ Clone the repository
      git clone https://github.com/sandhya-1611/movie-search-app.git
      cd movie-search-app
      cd moviemitra

    2️⃣ Install dependencies
      npm install

    3️⃣ Get a TMDB API key

      Sign up at TMDB

      Create a .env file in the moviemitra directory and add your API key:

      VITE_TMDB_API_KEY=your_api_key_here

    4️⃣ Run the development server
      npm run dev

    5️⃣ Build for production
      npm run build
      npm run preview

    📖 API Reference (TMDB)

      Login Page : https://www.themoviedb.org

      Base URL: https://api.themoviedb.org/3/

      Search Movies: /search/movie?api_key=YOUR_KEY&query=term&page=1

      Movie Details: /movie/{movie_id}?api_key=YOUR_KEY


      Images: https://image.tmdb.org/t/p/w500/{poster_path}
