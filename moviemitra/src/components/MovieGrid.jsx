import React from "react";
import MovieCard from "./MovieCard";

const GRID_ID = "mm-movie-grid";

const MovieGrid = ({ movies, loading = false }) => {
  const Skeleton = () => (
    <div className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 h-full">
      <div style={{ width: "100%", paddingTop: "150%", background: "rgba(75,85,99,.5)" }} />
      <div style={{ padding: 16 }}>
        <div style={{ height: 16, background: "rgba(75,85,99,.5)", borderRadius: 6, marginBottom: 8 }} />
        <div style={{ height: 12, width: "50%", background: "rgba(75,85,99,.5)", borderRadius: 6 }} />
      </div>
    </div>
  );

  if (loading) {
    return (
      <section style={{ width: "100%" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div id={GRID_ID}>
            {[...Array(8)].map((_, i) => <Skeleton key={i} />)}
          </div>
        </div>

        <style>{`
          #${GRID_ID} {
            display: grid;
            grid-template-columns: 1fr;              /* mobile: 1 per row */
            gap: 24px;                               /* horizontal + vertical space */
            padding: 0 16px;                         /* side gutters */
          }
          @media (min-width: 1024px) {
            #${GRID_ID} {
              grid-template-columns: repeat(4, minmax(0, 1fr));  /* desktop: 4 per row */
            }
          }
        `}</style>
      </section>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🎬</div>
        <h3 className="text-2xl font-semibold text-white mb-2">No movies found</h3>
        <p className="text-gray-300">Try searching for a different movie title</p>
      </div>
    );
  }

  return (
    <section style={{ width: "100%" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div id={GRID_ID}>
          {movies.map((movie, idx) => movie ? (
            <MovieCard key={movie.imdbID || `movie-${idx}`} movie={movie} />
          ) : null)}
        </div>
      </div>

      <style>{`
        #${GRID_ID} {
          display: grid;
          grid-template-columns: 1fr;              
          gap: 24px;                            
          padding: 0 16px;                    
        }
        @media (min-width: 1024px) {
          #${GRID_ID} {
            grid-template-columns: repeat(4, minmax(0, 1fr)); 
          }
        }
      `}</style>
    </section>
  );
};

export default MovieGrid;
