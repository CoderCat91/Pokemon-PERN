import React, { useState, createContext } from "react";

export const PokemonContext = createContext();

export const PokemonContextProvider = (props) => {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);


  return (
    <PokemonContext.Provider
      value={{
        pokemons,
        setPokemons,
        selectedPokemon,
        setSelectedPokemon,
      }}
    >
      {props.children}
    </PokemonContext.Provider>
  );
};