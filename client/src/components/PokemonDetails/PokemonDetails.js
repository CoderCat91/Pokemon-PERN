import React, { useContext, useEffect } from 'react';
import { PokemonContext } from '../../context/PokemonContext';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import SearchBar from '../SearchBar/SearchBar';
import './PokemonDetails.scss';
import PokedexFinder from '../../api/PokedexFinder';


const PokemonDetails = () => {
  const { id } = useParams();  
  const { pokemons, selectedPokemon, setSelectedPokemon } = useContext(PokemonContext); 
  const navigate = useNavigate();

  useEffect(() => {
   
    const fetchData = async () => {
      try {
        const pokemon = pokemons.find((pokemon) => pokemon.pokemon_num === parseInt(id));
        setSelectedPokemon(pokemon); 
      } catch (err) {
        console.log(err);
      }
    };

    fetchData(); 
  }, [id, pokemons, setSelectedPokemon]); 


  const goToNextPokemon = () => {
    const currentIndex = pokemons.findIndex((pokemon) => pokemon.pokemon_num === selectedPokemon.pokemon_num);
    const nextPokemon = pokemons[(currentIndex + 1) % pokemons.length]; // Get the next Pokémon (circular)

    setSelectedPokemon(nextPokemon);


    navigate(`/details/${nextPokemon.pokemon_num}`);
  };


  const goToPreviousPokemon = () => {
    const currentIndex = pokemons.findIndex((pokemon) => pokemon.pokemon_num === selectedPokemon.pokemon_num);
    const previousPokemon = pokemons[(currentIndex - 1 + pokemons.length) % pokemons.length]; 

    setSelectedPokemon(previousPokemon); 

 
    navigate(`/details/${previousPokemon.pokemon_num}`);
  };


  const addPokemonToPokedex = async () => {
    try {
      console.log("Selected Pokémon data:", selectedPokemon);
  
      // Ensure you're only sending the relevant data (excluding circular references)
      const { pokemon_num, name, type, health, attacks, evolves_into, images } = selectedPokemon;
      console.log("Sending the following data to the server:", { pokemon_num, name, type, health, attacks, evolves_into, images });
  
      // Send to backend
      await PokedexFinder.post('/add', {
        user_id: 2, 
        pokemon_num, 
        name,
        type,
        health,
        attacks,
        evolves_into,
        images
      });
  
      navigate(`/pokedex`);
    } catch (error) {
      console.error("Error adding Pokémon to Pokedex:", error);
      alert("There was an error adding the Pokemon to your Pokedex.");
    }
  };
  

  return (
    <div>
      <Header />
      <div className="search-bar-container">
        <SearchBar/>
        
      </div>

      {selectedPokemon && (
        <div className="detail-wrapper">
          <div className="detail-card">
            <div className="card-inner">
              <div className="card-top">
                <span>#{selectedPokemon.pokemon_num}</span><br />
                <h2>{selectedPokemon.name}</h2>
                <div className="detail-image">
                  <img src={selectedPokemon.images} alt="pokemon" />
                </div>
              </div>

              <div className="card-middle">
                <p><span>Type:</span> {selectedPokemon.type}</p>
                <p><span>Health:</span> {selectedPokemon.health} HP</p>
                <p><span>Attacks:</span> {selectedPokemon.attacks}</p>
                <p><span>Evolves into:</span> {selectedPokemon.evolves_into}</p>
              </div>

              <div className="card-bottom">
                <button onClick={goToPreviousPokemon} className="btn btn-dark">
                  Previous
                </button>
                <button onClick={goToNextPokemon} className="btn btn-dark">
                  Next
                </button>
                <button onClick={addPokemonToPokedex} className="btn btn-success">
                  Add to Pokédex
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonDetails;
