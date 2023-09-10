import React, {useContext, useEffect} from 'react';
import Header from '../Header/Header'
import PokemonFinder from '../../api/PokemonFinder';
import {PokemonContext} from '../../context/PokemonContext';
import './PokeDex.scss'
import { useNavigate } from 'react-router-dom';

const PokeDex = () => {
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

      const selectPokemon = (id) => {
        navigate(`/details/${id}`);
      };


    return (
        <div>
            <Header/>  <div className="list-group container">
        
        
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
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
          {pokemons && pokemons
             .sort(({ id: previousID }, { id: currentID }) => previousID - currentID)
             .map((pokemon) => {

        return (
   <tr>

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
        <h2>a</h2>
    </div>
  )
}

export default PokeDex;