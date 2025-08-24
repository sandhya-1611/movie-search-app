import React from "react";

export default function FilterBar({ filters, onFiltersChange, onClearFilters }) {
  const dropdownStyle = {
    padding: "10px 14px",
    borderRadius: "10px",
    border: "1px solid #4b5563", 
    backgroundColor: "#0d1117",
    color: "#e0e7ff", 
    fontWeight: "500",
    outline: "none",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
    transition: "all 0.2s ease-in-out",
  };

  const dropdownHoverFocus = {
    backgroundColor: "#111827",
    borderColor: "#8b5cf6", 
    boxShadow: "0 4px 12px rgba(139,92,246,0.5)",
  };

  const buttonStyle = {
    padding: "10px 24px",
    borderRadius: "20px",
    background: "linear-gradient(90deg, #ec4899, #8b5cf6)", 
    color: "#fff",
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 4px 15px rgba(236,72,153,0.5)",
    transition: "all 0.2s ease-in-out",
  };

  const buttonHover = {
    transform: "scale(1.05)",
    boxShadow: "0 6px 20px rgba(236,72,153,0.7)",
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto 32px auto",
        display: "flex",
        flexWrap: "wrap",
        gap: "12px",
        padding: "12px",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#0b1220",
        borderRadius: "14px",
        boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
      }}
    >

      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", flex: 1 }}>
        <select
          value={filters.type}
          onChange={(e) =>
            onFiltersChange({ ...filters, type: e.target.value })
          }
          style={dropdownStyle}
          onMouseOver={(e) => Object.assign(e.target.style, dropdownHoverFocus)}
          onMouseOut={(e) => Object.assign(e.target.style, dropdownStyle)}
          onFocus={(e) => Object.assign(e.target.style, dropdownHoverFocus)}
          onBlur={(e) => Object.assign(e.target.style, dropdownStyle)}
        >
          <option value="all">All Types</option>
          <option value="movie">Movies</option>
          <option value="series">Series</option>
        </select>

        <select
          value={filters.ratings || ""}
          onChange={(e) =>
            onFiltersChange({ ...filters, ratings: e.target.value })
          }
          style={{ ...dropdownStyle, color: "#fde68a" }} 
          onMouseOver={(e) => Object.assign(e.target.style, dropdownHoverFocus)}
          onMouseOut={(e) => Object.assign(e.target.style, { ...dropdownStyle, color: "#fde68a" })}
          onFocus={(e) => Object.assign(e.target.style, dropdownHoverFocus)}
          onBlur={(e) => Object.assign(e.target.style, { ...dropdownStyle, color: "#fde68a" })}
        >
          <option value="">All Ratings</option>
          <option value="9">9+ ⭐</option>
          <option value="8">8+ ⭐</option>
          <option value="7">7+ ⭐</option>
          <option value="6">6+ ⭐</option>
          <option value="5">5+ ⭐</option>
          <option value="4">4+ ⭐</option>
          <option value="3">3+ ⭐</option>
        </select>

        <select
          value={filters.sortBy}
          onChange={(e) =>
            onFiltersChange({ ...filters, sortBy: e.target.value })
          }
          style={{ ...dropdownStyle, color: "#a5b4fc" }} 
          onMouseOver={(e) => Object.assign(e.target.style, dropdownHoverFocus)}
          onMouseOut={(e) => Object.assign(e.target.style, { ...dropdownStyle, color: "#a5b4fc" })}
          onFocus={(e) => Object.assign(e.target.style, dropdownHoverFocus)}
          onBlur={(e) => Object.assign(e.target.style, { ...dropdownStyle, color: "#a5b4fc" })}
        >
          <option value="relevance">Relevance</option>
          <option value="yearAsc">Year Ascending</option>
          <option value="yearDesc">Year Descending</option>
        </select>
      </div>

      <button
        onClick={onClearFilters}
        style={buttonStyle}
        onMouseOver={(e) => Object.assign(e.target.style, buttonHover)}
        onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
      >
        Clear All
      </button>
    </div>
  );
}
