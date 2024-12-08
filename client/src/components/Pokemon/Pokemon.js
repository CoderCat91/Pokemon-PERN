import React, { useContext, useEffect, useState } from 'react';
import Header from '../Header/Header';
import SearchBar from '../SearchBar/SearchBar';
import PokemonFinder from '../../api/PokemonFinder';
import { PokemonContext } from '../../context/PokemonContext';
import './Pokemon.scss';
import { useNavigate } from 'react-router-dom';
import Buttons from './PokeButtons';

const Pokemon = () => {
  const { pokemons, setPokemons } = useContext(PokemonContext);
  const [filteredPokemons, setFilteredPokemons] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await PokemonFinder.get('/');
        console.log(response.data.data.pokemon, 'pokemon');
        setPokemons(response.data.data.pokemon);
        setFilteredPokemons(response.data.data.pokemon); 
      } catch (err) {
        console.log(err);
      }
    })();
  }, [setPokemons]);

  const pokeType = [...new Set(pokemons.map((val) => val.type))];

  const filterItem = (curcat) => {
    const newItem = pokemons.filter((newVal) => newVal.type === curcat);
    setFilteredPokemons(newItem); 
  };

  const selectPokemon = (id) => {
    navigate(`/details/${id}`);
  };


  

  return (
    <div>
      <Header />
      <div className="search-bar-container">
        <SearchBar/>
      
      </div>
      <Buttons
        filterItem={filterItem}
        setPokemons={setFilteredPokemons} 
        pokeType={pokeType}
      />
      <div className="list-group container">
        <table className="table table-hover table-light mt-3 pl-1">
          <thead>
            <tr className="bg-primary">
              <th scope="col">PokeDex No.</th>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Profile</th>
            </tr>
          </thead>
          <tbody>
            {filteredPokemons &&
              filteredPokemons
                .sort(({ id: previousID }, { id: currentID }) => previousID - currentID)
                .map((pokemon) => (
                  <tr key={pokemon.id}>
                    <td>{pokemon.pokemon_num}</td>
                    <td className="pokedex-images">
                      <img src={pokemon.images} alt="pokemon" />
                    </td>
                    <td>{pokemon.name}</td>
                    <td>
                      <button
                        onClick={() => selectPokemon(pokemon.id)}
                        className="btn btn-warning btn-lg"
                      >
                        Profile
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pokemon;
