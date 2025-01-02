import React, { useState } from 'react';
import "../HomeIndexDetails/HomeNavBarDetails/HomeNavbar.scss";


const SearchBar = () => {
  const [query, setQuery] = useState('');

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      console.log(`Searching for: ${query}`);
    }
  };

  return (
    <div className="customNavbar-icon-container">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
        className="customNavbar-search-input"
      />
    </div>
  );
};

export default SearchBar;
