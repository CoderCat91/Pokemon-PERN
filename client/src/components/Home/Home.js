import React, {useState} from 'react'
import Header from "../Header/Header"
import SearchBar from "../SearchBar/SearchBar"
import './Home.scss';
//import PokemonFinder from '../../api/PokemonFinder';
import SearchResultsList from '../SearchBar/SearchResultsList';
//import { PokemonContext } from '../../context/PokemonContext';

const Home = () => {
  const [results, setResults] = useState([]);
    return (
    <div>
        <Header/>
        <div className="search-bar-container">
        <SearchBar setResults={setResults} />
        {results && results.length > 0 && <SearchResultsList results={results} />}
      </div>

        <div className="home-wrapper">
        <h2>Pokemon - Did you catch 'em all?</h2>
        <div className="home-inner">
         Eveyone remembers the 1995 epic creation that is Pokemon. Whether you collected the cards, watched the shows or played the games, Pokemon was part of your childhood. This PokeDex features the original 151 Pokemon!
         Use the PokeDex to learn about your favourite pocket monsters, then add them to your own personal PokeDex!
          </div>
        </div>
     
          
    </div>

  )
}

export default Home
