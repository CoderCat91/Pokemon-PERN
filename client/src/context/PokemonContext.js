import React, { useState, createContext } from "react";


export const PokemonContext = createContext();
export const PokemonContextProvider = (props) => {
const [pokemons, setPokemons] = useState([]);
const [selectedPokemon, setSelectedPokemon] = useState(null);
const [changePokemon, setChangePokemon] = useState([])
return (
  <PokemonContext.Provider 
  value={{pokemons, setPokemons, selectedPokemon, setSelectedPokemon, changePokemon, setChangePokemon}}
>
  {props.children}
</PokemonContext.Provider>

)}