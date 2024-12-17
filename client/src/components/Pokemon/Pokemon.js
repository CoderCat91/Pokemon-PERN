import React, { useContext, useEffect, useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import PokemonFinder from '../../api/PokemonFinder';
import { PokemonContext } from '../../context/PokemonContext';
import './Pokemon.scss';
import { useNavigate } from 'react-router-dom';
import Buttons from './PokeButtons';
import PokedexFinder from '../../api/PokedexFinder';
import {Container, Row, Col, Table, Card } from 'react-bootstrap';


const Pokemon = () => {
  const { pokemons, setPokemons} = useContext(PokemonContext);
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


  const addPokemonToPokedex = async (pokemonId) => {
    try {
      const selectedPokemon = pokemons.find((pokemon) => pokemon.id === pokemonId);
      console.log("Selected Pokémon:", selectedPokemon);
      const { pokemon_num, name, type, health, attacks, evolves_into, images } = selectedPokemon;
      await PokedexFinder.post('/add', {
        pokemon_num,
        user_id: 2, 
        name,
        type,
        health,
        attacks,
        evolves_into,
        images,
      });
      navigate(`/pokedex`);
    } catch (error) {
      console.error("Error adding Pokémon to Pokedex:", error);
      alert("There was an error adding the Pokémon to your Pokédex.");
    }
  };
  
  

  return (
    <div>
        <SearchBar/>
        <Container fluid className='pokemon-container'>
      <p><em>Add Pokemon to your Pokedex to truely discover their power.</em></p>
      <Buttons
        filterItem={filterItem}
        setPokemons={setFilteredPokemons} 
        pokeType={pokeType}
        pokemons={pokemons}
        className="pokemon-buttons"
      />
      <Row className="pokemon-row">
            {filteredPokemons &&
              filteredPokemons
                .sort(({ id: previousID }, { id: currentID }) => previousID - currentID)
                .map((pokemon) => (
                  <Card className={`pokemon-card ${pokemon.type.toLowerCase()}`} key={pokemon.id}>
                    <div className='pokemon-image-wrapper'> 
                      <Card.Img src={pokemon.images} alt={pokemon.name}/></div>
                    <Card.Body> 
                      <Card.Title><em>#{pokemon.pokemon_num}</em></Card.Title>
                      <Card.Text>
                      <h4>{pokemon.name}</h4>
                      <button
                        onClick={() => addPokemonToPokedex(pokemon.id)}
                        className="btn btn-warning">
                        Add to PokeDex
                      </button>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                ))}
      </Row>
      </Container>
    </div>
  );
};

export default Pokemon;
