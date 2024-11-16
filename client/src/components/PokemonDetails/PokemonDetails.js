import React, { useContext, useEffect, useState } from 'react';
import { PokemonContext } from '../../context/PokemonContext';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import SearchBar from '../SearchBar/SearchBar';
import SearchResultsList from '../SearchBar/SearchResultsList';
import './PokemonDetails.scss';
import DashboardFinder from '../../api/DashboardFinder';

const PokemonDetails = () => {
  const [results, setResults] = useState([]);
  const { id } = useParams();  
  const { pokemons, selectedPokemon, setSelectedPokemon } = useContext(PokemonContext); // Access the Pokémon list and selected Pokémon from context
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
    const previousPokemon = pokemons[(currentIndex - 1 + pokemons.length) % pokemons.length]; // Get the previous Pokémon (circular)

    setSelectedPokemon(previousPokemon); 

 
    navigate(`/details/${previousPokemon.pokemon_num}`);
  };


  const addPokemonToDashboard = async () => {
    try {
      const { pokemon_num, name, type, health, attacks, evolves_into, images } = selectedPokemon;
      await DashboardFinder.post("/", {
        pokemon_num,
        name,
        type,
        health,
        attacks,
        evolves_into,
        images
      });
      navigate(`/dashboard`);
    } catch (err) {
      console.error("Error adding Pokémon to dashboard:", err);
      alert("There was an error adding the Pokémon to your dashboard.");
    }
  };


  return (
    <div>
      <Header />
      <div className="search-bar-container">
        <SearchBar setResults={setResults} />
        {results && results.length > 0 && <SearchResultsList results={results} />}
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
                <p>Type: {selectedPokemon.type}</p>
                <p>Health: {selectedPokemon.health} HP</p>
                <p>Attacks: {selectedPokemon.attacks}</p>
                <p>Evolves into: {selectedPokemon.evolves_into}</p>
              </div>

              <div className="card-bottom">
                <button onClick={goToPreviousPokemon} className="btn btn-danger">
                  Previous Pokémon
                </button>
                <button onClick={goToNextPokemon} className="btn btn-danger">
                  Next Pokémon
                </button>
                <button onClick={addPokemonToDashboard} className="btn btn-success">
                  Add to Dashboard
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
