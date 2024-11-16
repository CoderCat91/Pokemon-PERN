import React, {useContext, useEffect, useState} from 'react';
import Header from '../Header/Header'
import SearchBar from '../SearchBar/SearchBar';
import PokemonFinder from '../../api/PokemonFinder';
import {PokemonContext} from '../../context/PokemonContext';
import './PokeDex.scss'
import { useNavigate } from 'react-router-dom';
import Buttons from './PokeButtons';
import SearchResultsList from '../SearchBar/SearchResultsList';


const PokeDex = () => {
const { pokemons, setPokemons } = useContext(PokemonContext);
const [item, setItem] = useState(pokemons);
const navigate = useNavigate();
const [results, setResults] = useState([]);


useEffect(() => {
        (async () => {
          try {
            const response = await PokemonFinder.get("/");
            console.log(response.data.data.pokemon, "pokemon");
            setPokemons(response.data.data.pokemon)
          } catch (err) {
            console.log(err);
          }
        })();  
      }, [setPokemons]);

      const pokeType = [...new Set(pokemons.map((val) => val.type))];

        
      const filterItem = (curcat) => {
          const newItem = pokemons.filter((newVal) => {
            return newVal.type === curcat;
          });
          setPokemons(newItem);
        };
      
    
    

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
            <Buttons
      filterItem={filterItem}
      setPokemons={setItem}
      pokeType={pokeType}
    />
            <div className="list-group container">
        <table className="table table-hover table-dark">
          <thead>
            <tr className="bg-primary">
            <th scope="col">PokeDex No.</th>
            <th scope ='col'>Image</th>
              <th scope="col">Name</th>
              <th scope="col">Profile</th>
            </tr>
          </thead>
          <tbody item={item}>
          {pokemons && pokemons
             .sort(({ id: previousID }, { id: currentID }) => previousID - currentID)
             .map((pokemon) => {

        return (
   <tr    key={pokemon.id}>

<td>{pokemon.pokemon_num}</td>
   <td className='pokedex-images'><img src={pokemon.images} alt='pokemon'/></td>
   <td>{pokemon.name}</td>
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

export default PokeDex;