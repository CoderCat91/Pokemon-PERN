import React from "react";
import './PokeButtons.scss'
import { Container, Button } from "react-bootstrap";

const Buttons = ({ filterItem, setPokemons, pokeType, pokemons }) => {
  function chooseAll() {
   setPokemons(pokemons); 
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
    <Container fluid className="poke-buttons">
      {pokeType.map((val, id) => (
        <Button
          className={` ${getButtonClass(val)}`}
          onClick={() => filterItem(val)}
          key={id}
        >
          {val}
        </Button>
      ))}
      <Button
        className="btn-dark"
        onClick={chooseAll}
      >
        All
      </Button>
    </Container>
  );
};


export default Buttons;
