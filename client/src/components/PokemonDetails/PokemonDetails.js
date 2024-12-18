import React, { useContext, useEffect } from 'react';
import { PokemonContext } from '../../context/PokemonContext';
import { useParams, useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import './PokemonDetails.scss';


const PokemonDetails = () => {
  const { pokemon_num } = useParams();  
  const { pokemons, selectedPokemon, setSelectedPokemon, loading } = useContext(PokemonContext); 
  
  const navigate = useNavigate();

  

useEffect(() => {
  const fetchData = async () => {
    try {
      if (pokemons.length === 0) {
        console.log('Pokémons not loaded yet');
        return;
      }

      console.log('Fetching Pokémon details for pokemon_num:', pokemon_num);
      const pokemon = pokemons.find((pokemon) => pokemon.pokemon_num === parseInt(pokemon_num));
      console.log('Found Pokémon:', pokemon);
      setSelectedPokemon(pokemon);
    } catch (err) {
      console.error('Error fetching Pokémon details:', err);
    }
  };

  fetchData();
}, [pokemon_num, pokemons, setSelectedPokemon]);

if (loading) {
  return <div>Loading Pokémon data...</div>;
}


  


  const goToNextPokemon = () => {
    const currentIndex = pokemons.findIndex((pokemon) => pokemon.pokemon_num === selectedPokemon.pokemon_num);
    const nextPokemon = pokemons[(currentIndex + 1) % pokemons.length]; 

    setSelectedPokemon(nextPokemon);


    navigate(`/details/${nextPokemon.pokemon_num}`);
  };


  const goToPreviousPokemon = () => {
    const currentIndex = pokemons.findIndex((pokemon) => pokemon.pokemon_num === selectedPokemon.pokemon_num);
    const previousPokemon = pokemons[(currentIndex - 1 + pokemons.length) % pokemons.length]; 

    setSelectedPokemon(previousPokemon); 

 
    navigate(`/details/${previousPokemon.pokemon_num}`);
  };


 
  

  return (
    <div>
        <SearchBar/>

      {selectedPokemon && (
        <div className="detail-wrapper">
          <div className={`detail-card ${selectedPokemon.type.toLowerCase()}`}>
            <div className="card-inner">
              <div className="card-top">
                <span>#{selectedPokemon.pokemon_num}</span><br />
                <h2>{selectedPokemon.name}</h2>
                <div className="detail-image">
                  <img src={selectedPokemon.images} alt={selectedPokemon.name} />
                </div>
                <p><span>Description:</span> {selectedPokemon.description}</p>
              </div>

              <div className="card-middle">
              
                <p><span>Health:</span> {selectedPokemon.health} HP</p>
                <p><span>Attack:</span> {selectedPokemon.attacks}</p>
                <p><span>Type:</span> {selectedPokemon.type}</p>
                <p><span>Subtype:</span> {selectedPokemon.subtype}</p>
                <p><span>Weak against:</span> {selectedPokemon.weakness}</p>
                <p><span>Strong against:</span> {selectedPokemon.strength}</p>
                <p><span>Other attack:</span> {selectedPokemon.second_attack}</p>
                <p><span>Evolves into:</span> {selectedPokemon.evolves_into}</p>
                

              </div>

              <div className="card-bottom">
                <button onClick={goToPreviousPokemon} className="btn btn-dark">
                  Previous
                </button>
                <button onClick={goToNextPokemon} className="btn btn-dark">
                  Next
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
