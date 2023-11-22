import React, {useContext, useEffect, useState} from 'react';
import { PokemonContext } from '../../context/PokemonContext';
import PokemonFinder from '../../api/PokemonFinder';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import SearchBar from '../SearchBar/SearchBar';
import SearchResultsList from '../SearchBar/SearchResultsList';
import './PokemonDetails.scss';
import { useNavigate } from 'react-router-dom';

const PokemonDetails = ({pokemon}) => {
const [results, setResults] = useState([]);
const { id } = useParams();
const { selectedPokemon, setSelectedPokemon } = useContext(PokemonContext);
console.log('selected',selectedPokemon);
const navigate = useNavigate();



   
  

    
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await PokemonFinder.get(`/${id}`);
          setSelectedPokemon(response.data.data.pokemon);
          console.log(response.data.data.pokemon)
        } catch (err) {
          console.log(err);
        }
      };
  
      fetchData();
    }, []);

   
    const goPokedex = () => {
      navigate(`/pokedex`);
    };
    
    
    return (
      <div>
        <Header/>
        <div className="search-bar-container">
        <SearchBar setResults={setResults} />
        {results && results.length > 0 && <SearchResultsList results={results} />}
      </div>
        {selectedPokemon && (
          <div className="detail-wrapper">
            <div className="detail-card">
              <div className='card-inner'>
              <div className='card-top'>
                #{selectedPokemon.pokemon_num}<br/>
             <h2>{selectedPokemon.name}</h2> 
              <div className='detail-image'>
              <img src={selectedPokemon.images} alt="pokemon"/>
            </div>
            </div>
        
            <div className="card-middle">
            Type: {selectedPokemon.type}<br/>
              Health: {selectedPokemon.health} HP<br/>
              Attacks: {selectedPokemon.attacks}<br/>
              Evolves into: {selectedPokemon.evolves_into}
            </div>
            <div className='card-bottom'>
            <button onClick={() => goPokedex()}className='btn btn-danger'>Pokedex</button>
              </div>
              </div>
          </div>
          </div>
        )}
      </div>
    );
  };

export default PokemonDetails;