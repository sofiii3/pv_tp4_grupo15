import React from 'react';
import './SearchBar.css';

function SearchBar({ onSearchChange, searchTerm }) {
  const handleChange = (e) => {
    onSearchChange(e.target.value); 
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Buscar productos por descripción o ID..."
        value={searchTerm} 
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBar;