import React from 'react';

export default function Loader({ rows = 4 }) {
  return (
    <div className="loader" aria-label="Loading">
      {Array.from({ length: rows }).map((_, index) => (
        <div className="skeleton-line" key={index} />
      ))}
    </div>
  );
}
