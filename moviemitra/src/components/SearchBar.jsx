import React, { useState } from "react";

const SearchBar = ({ onSearch, placeholder = "Search for movies..." }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setSearchQuery("");
    onSearch(""); 
  };

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          width: "80%",
          maxWidth: "800px",
          padding: "16px 32px",
          borderRadius: "16px",
          backdropFilter: "blur(10px)",
          border: "2px solid #60a5fa",
          boxShadow: isFocused
            ? "0 0 15px rgba(96,165,250,0.8)"
            : "0 0 8px rgba(96,165,250,0.4)",
          transition: "all 0.3s ease",
        }}
      >
        <div style={{ position: "absolute", left: "16px" }}>
          <svg
            style={{ height: "24px", width: "24px", color: "gray" }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            width: "100%",
            background: "transparent",
            border: "none",
            outline: "none",
            fontSize: "1.2rem",
            color: "white",
            paddingLeft: "40px",
            paddingRight: "40px",
            textAlign: "center",
          }}
        />

        {searchQuery && (
          <button
            onClick={clearSearch}
            style={{
              position: "absolute",
              right: "16px",
              fontSize: "1.2rem",
              color: "#bbb",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
