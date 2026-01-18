import React, { useContext, useEffect } from 'react';
import { PokemonContext } from '../../context/PokemonContext';
import { useParams, useNavigate } from 'react-router-dom';
import {Container, Row, Col, Card} from 'react-bootstrap'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import './PokemonDetails.scss';


const PokemonDetails = () => {
  const { pokemon_num } = useParams();  
  const { pokemons, selectedPokemon, setSelectedPokemon, loading } = useContext(PokemonContext); 
  
  const navigate = useNavigate();

  

useEffect(() => {
  const fetchData = async () => {
    try {
      if (pokemons.length === 0) {
       // console.log('Pokémons not loaded yet');
        return;
      }

//      console.log('Fetching Pokémon details for pokemon id', pokemon_num);
      const pokemon = pokemons.find((pokemon) => pokemon.pokemon_num === parseInt(pokemon_num));
      //console.log('Found Pokémon:', pokemon);
      //console.log(pokemon.strength.split(", "));
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

  const colourCoderStrength = () => {
    const strengthString = selectedPokemon.strength;
    const wordArray = strengthString.split(", ");
    return wordArray.map((word, index) => (
      <div 
        key={index} 
        className={`strength-type strength-${word.toLowerCase()}`}
        style={{height: '30px', width: '100px', borderRadius: '5px', fontWeight: 'bold', padding: '2px', fontSize: '1rem'}}
      >
        {word}
      </div>
    ));
  };
 
  const colourCoderWeakness = () => {
    const weaknessString = selectedPokemon.weakness;
    const wordArray = weaknessString.split(", ");
    return wordArray.map((word, index) => (
      <div 
        key={index} 
        className={`weakness-type weakness-${word.toLowerCase()}`}
        style={{height: '30px', width: '100px', borderRadius: '5px', fontWeight: 'bold', padding: '2px', fontSize: '1rem'}}
      >
        {word}
      </div>
    ));
  };
  

const imgString = () => {
  const imageString = selectedPokemon.evolve_image;
  console.log(imageString)
  if (selectedPokemon.pokemon_num === 133) {
    const imgArray = imageString.split(",");
    return (
      <div style={{ display: 'flex', gap: '8px' }}>
        {imgArray.map((url, index) => (
          <img
            key={index}
            src={url} 
            alt={"alt"}
          />
        ))}
      </div>
    );
  } else if (imageString) {
    return (
      <div>
        <img
          src={imageString}
          alt="Evolution"
        />
      </div>
    );
  } else {
    return null;
  }
};


  return (
    <div className="details-page">
      <Header/>

      {selectedPokemon && (
        <Container fluid className="detail-wrapper">
          <Row>
            
      
            <Col xl={12}>
          <div className={`detail-card ${selectedPokemon.type.toLowerCase()}`}>
            <Row className="card-inner">
              
              <Col xl={6}>
              <Card className={`card-right ${selectedPokemon.type.toLowerCase()}`}>
                <span>#{selectedPokemon.pokemon_num}</span><br />
                <h2>{selectedPokemon.name}</h2>
                <div className="detail-image">
                  <img src={selectedPokemon.images} alt={selectedPokemon.name} />
                </div>
                <p>{selectedPokemon.description}</p>
              </Card>
              </Col>
              <Col className="card-col" xl={6}>
              <Card className={`card-left ${selectedPokemon.type.toLowerCase()}`}>
              <p><span>Height</span> {selectedPokemon.height}m</p>
              <p><span>Weight</span> {selectedPokemon.weight}kg</p>
                <p><span>Health</span> {selectedPokemon.health} HP</p>
                <p><span>Attack</span> {selectedPokemon.attacks}</p>
                <p><span>Other attack</span> {selectedPokemon.second_attack}</p>
              </Card>
              </Col>
              </Row>
<Row>
  <Col xs={12}>
  <Card className={`card-middle ${selectedPokemon.type.toLowerCase()}`}>
    <div className="type-row"><span>Type</span>
    <div className={`pokemon-type ${selectedPokemon.type.toLowerCase()}`}>{selectedPokemon.type}</div>
    </div>
    <div className="subtype-row"><span>Subtype</span>
    <div className={`pokemon-subtype ${selectedPokemon.subtype.toLowerCase()}`}>{selectedPokemon.subtype}</div>
    </div>
  
<div className="strength-row"><i className="bi bi-plus-square" style={{color: 'green'}}></i>
{colourCoderStrength()}
</div>
 <div className="weakness-row"><i className="bi bi-dash-square" style={{color: 'red'}}></i>
{colourCoderWeakness()}
</div>
 

  </Card>
  
  </Col>
              
</Row>
<Row>
  <Col xs={12}>
<Card className={`card-bottom ${selectedPokemon.type.toLowerCase()}`}>
  <p>
    <span>Evolves into </span>
    {selectedPokemon.evolves_into}
  </p>


  {imgString()}




</Card>

  </Col>
</Row>


          </div>
              
              </Col>
              
              </Row>
<div className='button-container'>
<div className="card-button-left">
                <button onClick={goToPreviousPokemon} className={`button-left ${selectedPokemon.type.toLowerCase()}`}>
                  Prev
                </button>
                </div>
              <div className='card-button-right'>
                <button onClick={goToNextPokemon} className={`button-right ${selectedPokemon.type.toLowerCase()}`}>
                  Next
                </button>
              </div>
</div>
              
        </Container>
        
      )}
          <Footer/>
    </div>

  );
};

export default PokemonDetails;

