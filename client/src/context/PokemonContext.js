import React, { useState, createContext, useEffect } from "react";
import PokemonFinder from "../api/PokemonFinder";

export const PokemonContext = createContext();
export const PokemonContextProvider = (props) => {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [changePokemon, setChangePokemon] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchPokemons = async () => {
    try {
      const response = await PokemonFinder.get("/"); 
      setPokemons(response.data.data.pokemon); 
    } catch (error) {
      console.error("Error", error);
    } finally {
      setLoading(false); 
    }
  };

  fetchPokemons();
}, []);

useEffect(() => {
  console.log(pokemons);
}, [pokemons]);
return (
  <PokemonContext.Provider 
  value={{pokemons, setPokemons, selectedPokemon, setSelectedPokemon, changePokemon, setChangePokemon, loading}}
>
  {props.children}
</PokemonContext.Provider>

)}