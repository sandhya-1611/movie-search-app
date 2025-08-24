import React from "react";
import { useNavigate } from "react-router-dom";
import { useFavoritesContext } from "../context/FavoritesContext";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavoritesContext();

  const {
    Title: title = "Movie Title",
    Year: year = "N/A",
    Poster: poster = null,
    imdbID = "",
    Type: type = "movie",
  } = movie;

  const posterUrl =
    poster && poster !== "N/A"
      ? poster
      : "https://via.placeholder.com/300x450/374151/9ca3af?text=No+Poster+Available";

  const isMovieFavorite = isFavorite(imdbID);

  const handleCardClick = () => imdbID && navigate(`/movie/${imdbID}`);
  const handleFavoriteClick = (e) => { e.stopPropagation(); toggleFavorite(movie); };
  const handleImageError = (e) => { e.target.src = "https://via.placeholder.com/300x450/374151/9ca3af?text=Image+Not+Found"; };

  return (
    <div onClick={handleCardClick} style={{ height: "100%" }}>
      <div
        className="movie-card"
        style={{
          height: "100%",                              
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: 12,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          transition: "transform .2s ease, box-shadow .2s ease, border-color .2s ease",
        }}
      >
        <div style={{ position: "relative", width: "100%", paddingTop: "150%" }}>
          <img
            src={posterUrl}
            alt={title}
            onError={handleImageError}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform .3s ease",
            }}
          />
          <button
            onClick={handleFavoriteClick}
            style={{
              position: "absolute",
              top: 8,
              left: 8,
              padding: 8,
              borderRadius: 9999,
              backdropFilter: "blur(6px)",
              background: isMovieFavorite ? "rgba(239,68,68,.85)" : "rgba(0,0,0,.5)",
              color: isMovieFavorite ? "#fff" : "#d1d5db",
              border: "none",
              cursor: "pointer",
            }}
          >
            ♥
          </button>
          <div
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              background: "rgba(59,130,246,.85)",
              color: "#fff",
              fontSize: 12,
              padding: "2px 8px",
              borderRadius: 9999,
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            {type}
          </div>

          <div className="card-overlay" style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0,
            transition: "opacity .3s ease"
          }}>
            <button
              style={{
                background: "#3b82f6",
                color: "#fff",
                padding: "8px 14px",
                borderRadius: 10,
                border: "none",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              View Details
            </button>
          </div>
        </div>

        <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: 8, flexGrow: 1 }}>
          <h3 style={{ color: "#fff", fontWeight: 600, fontSize: 18, lineHeight: 1.2, margin: 0 }}>
            {title}
          </h3>
          <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "#d1d5db", fontSize: 14, fontWeight: 500 }}>📅 {year}</span>
            {isMovieFavorite && (
              <span style={{ color: "#f87171", fontSize: 12, fontWeight: 600, background: "rgba(239,68,68,.2)", padding: "2px 8px", borderRadius: 6 }}>
                ❤️ Favorite
              </span>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .movie-card:hover { transform: scale(1.03); box-shadow: 0 10px 25px rgba(59,130,246,.25); border-color: rgba(96,165,250,.6); }
        .movie-card:hover img { transform: scale(1.06); }
        .movie-card:hover .card-overlay { opacity: 1; }
      `}</style>
    </div>
  );
};

export default MovieCard;
