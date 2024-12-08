import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PokemonContext } from "../../context/PokemonContext";
import ball from '../../images/pngegg (1).png';
import './SearchBar.scss';

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const { pokemons } = useContext(PokemonContext); 
  const navigate = useNavigate();

 
  const handleChange = (value) => {
    setInput(value);
    if (value.trim() === "") {
      setResults([]); 
      return;
    }
    const filteredResults = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(value.toLowerCase())
    );
    setResults(filteredResults);
  };

  const handleResultClick = (pokemonId) => {
    navigate(`/details/${pokemonId}`);
    setResults([]); 
    setInput(""); 
  };


  const handleSubmit = () => {
    if (results.length > 0) {
      navigate(`/details/${results[0].id}`); 
      setResults([]); 
      setInput(""); 
    }
  };

  return (
    <div className="search-wrapper">
      <div className="search-inner">
        <input
          type="text"
          placeholder="Type to search..."
          value={input}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
      <div className="pokeball">
        <button onClick={handleSubmit} className="pokeball-btn">
          <img src={ball} alt="Search Pokeball" />
        </button>
      </div>
      <div>
      {results.length > 0 && (
        <div className="results-list">
          {results.map((pokemon) => (
            <div
              key={pokemon.id}
              className="search-result"
              onClick={() => handleResultClick(pokemon.id)}
            >
              {pokemon.name}
            </div>
          ))}
        </div>
        
      )}
      </div>
    </div>
  );
};

export default SearchBar;
