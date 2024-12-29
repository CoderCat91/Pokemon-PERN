import React, { useState } from "react";
import './SearchBar.scss';

const SearchBar = ({ onFilter }) => {
  const [input, setInput] = useState("");

  const handleChange = (value) => {
    setInput(value);
    onFilter(value);
  };

  return (
    <div className="search-wrapper">
      <div className="search-inner">
        <input
          type="text"
          placeholder="Search by name..."
          value={input}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
