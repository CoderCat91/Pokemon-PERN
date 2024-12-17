import React, { useState, createContext, useEffect } from "react";


export const PokemonContext = createContext();
export const PokemonContextProvider = (props) => {
const [pokemons, setPokemons] = useState([]);
const [selectedPokemon, setSelectedPokemon] = useState(null);
const [changePokemon, setChangePokemon] = useState([]);

useEffect(() => {
  console.log('Context Pokémon data:', pokemons);
}, [pokemons]);
return (
  <PokemonContext.Provider 
  value={{pokemons, setPokemons, selectedPokemon, setSelectedPokemon, changePokemon, setChangePokemon}}
>
  {props.children}
</PokemonContext.Provider>

)}