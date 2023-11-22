import React, {useState} from 'react'
import Header from "../Header/Header"
import Footer from '../Footer/Footer'
import SearchBar from "../SearchBar/SearchBar"
import './Home.scss';
import charmander from '../../images/ezgif.com-webp-to-png (4).png';
import charmeleon from '../../images/ezgif.com-webp-to-png (5).png';
import charizard from '../../images/ezgif.com-webp-to-png (6).png'
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
         <p>Eveyone remembers the 1995 epic creation that is Pokemon. Whether you collected the cards, watched the shows or played the games, Pokemon was part of your childhood. This PokeDex features the original 151 Pokemon!
         Use the PokeDex to learn about your favourite pocket monsters, then add them to your own personal PokeDex!
         </p>
         <div className="home-media">
         <a href="https://www.pokemon.com/uk/pokemon-tcg"> 
         <figure>
         <img src={charmander} alt="Charmander"/>
         <figcaption>Trading Card Games</figcaption>
         </figure>
         </a>
         <a href="https://www.pokemon.com/uk/animation/movies">
         <figure>
        <img src={charmeleon} alt="Charmeleon"/>
        <figcaption>Movies & Shows</figcaption>
        </figure>
        </a>
        <a href="https://www.pokemon.com/uk/pokemon-video-games">
        <figure>
        <img src={charizard} alt="Charizard"/>
        <figcaption>Games</figcaption>
        </figure>
        </a>
         </div>
         </div>
        </div>
     
<Footer/>          
    </div>

  )
}

export default Home
