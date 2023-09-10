import React, {useContext, useEffect} from 'react';
import { PokemonContext } from '../../context/PokemonContext';
import PokemonFinder from '../../api/PokemonFinder';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header'
const PokemonDetails = () => {
    const { id } = useParams();
    const { selectedPokemon, setSelectedPokemon } = useContext(
      PokemonContext
    );
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await PokemonFinder.get(`/${id}`);
          console.log(response);
  
          setSelectedPokemon(response.data.data.pokemon);
        } catch (err) {
          console.log(err);
        }
      };
  
      fetchData();
    }, []);
    return (
      <div>
        <Header/>
        {selectedPokemon && (
          <>
            <h1 className="text-center display-1">
              {selectedPokemon.name}
            </h1>
            <div className="text-center">
            </div>
          </>
        )}
      </div>
    );
  };

export default PokemonDetails;