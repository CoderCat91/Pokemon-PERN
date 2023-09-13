import { useState } from "react";
import ball from '../../images/pngegg (1).png'
import './SearchBar.scss'

const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");

  const fetchData = (value) => {
    fetch("http://localhost:3000/api/v1/pokemon")
      .then((response) => response.json())
      .then((json) => {
        const results = json.data.pokemon.filter((user) => {
          return (
            value &&
            user &&
            user.name &&
            user.name.toLowerCase().includes(value)
          );
        });
        setResults(results);
        console.log(results)
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="search-wrapper">
      <div className="search-inner">
      <input
        placeholder=" Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
    <div className="pokeball">
    <img src={ball} alt="pokemon ball"/>
    </div>
    </div>
    
  );
};

export default SearchBar;