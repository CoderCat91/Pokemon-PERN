import React from "react";
import './PokeButtons.scss'

const Buttons = ({ filterItem, setPokemons, pokeType }) => {
  function refreshPage() {
    setPokemons([]); 
  }

  const getButtonClass = (type) => {
    switch (type.toLowerCase()) {
      case 'fire':
        return 'fire-btn';
      case 'grass':
        return 'grass-btn';
      case 'water':
        return 'water-btn';
      case 'ground':
        return 'ground-btn';
      case 'normal':
        return 'normal-btn';
      case 'bug':
        return 'bug-btn';
      case 'poison':
        return 'poison-btn';
      case 'electric':
        return 'electric-btn';
      case 'psychic':
        return 'psychic-btn';
      case 'fighting':
        return 'fighting-btn';
      case 'rock':
        return 'rock-btn';
      case 'ice':
        return 'ice-btn';
      case 'dragon':
        return 'dragon-btn';
      default:
        return 'default-btn';
    }
  };

  return (
    <div className="d-flex justify-content-center">
      {pokeType.map((val, id) => (
        <button
          className={`btn text-white p-2 mb-2 mx-1 fw-bold ${getButtonClass(val)}`}
          onClick={() => filterItem(val)}
          key={id}
        >
          {val}
        </button>
      ))}
      <button
        className="btn-dark text-white p-1 px-3 mx-5 mb-2 fw-bold"
        onClick={refreshPage}
      >
        All
      </button>
    </div>
  );
};


export default Buttons;
