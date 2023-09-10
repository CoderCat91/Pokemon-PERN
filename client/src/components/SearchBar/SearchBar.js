import React, {useContext, useState, useEffect} from 'react';
import './SearchBar.scss';

const SearchBar = () => {
    const [input, setInput] = useState("");

const fetchData = (value) => {
fetch("http://localhost:3000/api/v1/pokemon")
.then((res) => res.json())
.then((json) => {
    const results = json.data.pokemon.filter((pokemon) => {
        return pokemon && pokemon.name.toLowerCase().includes(value);
    });
    console.log(results)
})
}
      
const handleChange = (value) => {
setInput(value);
fetchData(value);
}
    return (
        <div className='search-wrapper'>
            SearchBar
            <input
   type="text"
   placeholder="Search here"
   onChange={(e) => handleChange(e.target.value)}
   value={input} />
        </div>
    );
};

export default SearchBar;