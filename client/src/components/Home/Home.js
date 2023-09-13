import React, {useState, useContext, useEffect} from 'react'
import Header from "../Header/Header"
import SearchBar from "../SearchBar/SearchBar"
import './Home.scss';
import PokemonFinder from '../../api/PokemonFinder';
import SearchResultsList from '../SearchBar/SearchResultsList';
import { useNavigate } from 'react-router-dom';
import { PokemonContext } from '../../context/PokemonContext';

const Home = () => {
  const [results, setResults] = useState([]);
  const { pokemons, setPokemons } = useContext(PokemonContext);
const navigate = useNavigate();

useEffect(() => {
        (async () => {
          try {
            const response = await PokemonFinder.get("/");
            console.log(response.data.data.pokemon);
            setPokemons(response.data.data.pokemon)
          } catch (err) {
            console.log(err);
          }
        })();  // making sure you run the function, not just defining it!
      }, [setPokemons]);

const fireSelect = () => {
  var fireType =  pokemons.filter(function(pokemon) {
    return pokemon.type === "Fire";
  });
  
  console.log(fireType);
}    
  

      const selectPokemon = (id) => {
        navigate(`/details/${id}`);
      };

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
        <div className="list-group container">
        <table className="table table-hover table-dark">
          <thead>
            <tr className="bg-primary">
            <th scope="col">PokeDex No.</th>
            <th scope ='col'>Image</th>
              <th scope="col">Name</th>
              <th scope="col">Type</th>
              <th scope="col">Health</th>
              <th scope="col">Attacks</th>
              <th scope="col">Evolves into:</th>
              <th scope='col'>Rating</th>
              <th scope="col">Profile</th>
            </tr>
          </thead>
          <tbody>
          {pokemons && pokemons
             .sort(({ id: previousID }, { id: currentID }) => previousID - currentID)
             .map((pokemon) => {

        return (
   <tr    key={pokemon.id}>

<td>{pokemon.pokemon_num}</td>
   <td className='pokedex-images'><img src={pokemon.images} alt='pokemon'/></td>
   <td>{pokemon.name}</td>
   <td>{pokemon.type}</td>
   <td>{pokemon.health}</td>
   <td>{pokemon.attacks}</td>
   <td>{pokemon.evolves_into}</td>
   <td>rating</td>
   <td><button onClick={() => selectPokemon(pokemon.id)}className='btn btn-danger'>Profile</button></td>
</tr>
                  )
                })}
    
          </tbody>
        </table>
      </div>
    </div>

  )
}

export default Home
