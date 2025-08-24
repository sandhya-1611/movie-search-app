import React from "react";

const features = [
  { title: "Feature One", description: "Description of feature one." },
  { title: "Feature Two", description: "Description of feature two." },
  { title: "Feature Three", description: "Description of feature three." },
  { title: "Feature Four", description: "Description of feature four." },
];

export default function Features() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr", 
        gap: "20px", 
        padding: "20px",
      }}
    >
      {features.map((feature, index) => (
        <div
          key={index}
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            textAlign: "center",
          }}
        >
          <h3 style={{ marginBottom: "10px" }}>{feature.title}</h3>
          <p>{feature.description}</p>
        </div>
      ))}

      <style>
        {`
          @media (min-width: 768px) {
            div[style*="display: grid"] {
              grid-template-columns: 1fr 1fr; /* 2 per row on desktop */
            }
          }
        `}
      </style>
    </div>
  );
}
