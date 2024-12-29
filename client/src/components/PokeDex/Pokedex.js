import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProtectedInfo, onLogout } from '../../api/auth';
import { AuthContext } from '../../context/authContext';
import SearchBar from '../SearchBar/SearchBar';
import Header from '../Header/Header'
import PokedexFinder from '../../api/PokedexFinder';
import Footer from '../Footer/Footer'
import './Pokedex.scss';
import {Container, Card, Row} from 'react-bootstrap'

const Pokedex = () => {
  const [loading, setLoading] = useState(true);
  const [protectedData, setProtectedData] = useState(null);
  const [pokedexData, setPokedexData] = useState([]); 
  const { isAuth, unauthenticateUser, userId } = useContext(AuthContext);
const navigate = useNavigate();

  const calculateLevel = (dateCaught) => {
    const dateCaughtTime = new Date(dateCaught).getTime(); 
    const currentTime = Date.now(); 
    const timeElapsed = currentTime - dateCaughtTime; 
    const daysElapsed = Math.floor(timeElapsed / (1000 * 60 * 60 * 24)); 
    return 1 + daysElapsed; 
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    console.log("User ID:", userId); 
    const fetchPokedex = async () => {
      try {
        const response = await PokedexFinder.get(`/${userId}`);
        const data = response.data;
        console.log(data)
        const updatedPokedex = data.map(pokemon => ({
          ...pokemon,
          level: calculateLevel(pokemon.date_caught),
        }));
        setPokedexData(updatedPokedex);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching Pokedex:', err);
        setLoading(false);
      }
    };

    fetchPokedex();
  }, []);

  const deletePokemonFromPokedex = async (pokemon_num) => {
    try {
      const userId = localStorage.getItem('userId');
      await PokedexFinder.delete(`/${userId}/${pokemon_num}`);
      setPokedexData(pokedexData.filter(pokemon => pokemon.pokemon_num !== pokemon_num));
    } catch (err) {
      console.error('Error deleting Pokémon:', err);
      alert('Failed to delete Pokémon.');
    }
  };

  const logout = async () => {
    try {
      await onLogout();
      unauthenticateUser();
      localStorage.removeItem('isAuth');
    } catch (error) {
      console.log(error.response);
    }
  };

  const protectedInfo = async () => {
    try {
      const { data } = await fetchProtectedInfo();
      setProtectedData(data.info);
      setLoading(false);
    } catch (error) {
      logout();
    }
  };

  useEffect(() => {
    if (isAuth) {
      protectedInfo();
    } else {
      logout();
    }
  }, [isAuth]);


  const selectPokemon = (pokemon_num) => {
    navigate(`/details/${pokemon_num}`);
  };

  return (
    <div className='pokedex-page'>
      <Header/>
        <SearchBar/>
      <h2>Pokédex</h2>
      <p>Hey! Welcome to your Pokedex, I'm a tool you can use to learn more about Pokemon.<br/>
        You can only have one unique Pokemon in your Pokedex at once, so choose wisely! <br/>
        Also, your Pokemon will level up after 24 hours, every ten levels you will be able to evolve your Pokemon!
      </p>
    <Container fluid className='pokedex-container'>  
    <Row className="pokedex-row">    
 {pokedexData.map((pokemon) => (
    <Card className={`pokemon-card ${pokemon.type.toLowerCase()}`} key={pokemon.pokemon_num}>
      <Card.Title><h5>#{pokemon.pokemon_num}</h5></Card.Title>
      <Card.Img src={pokemon.images} alt={pokemon.name} className="pokedex-image" />
      <Card.Body className="pokemon-info">
        <h5>{pokemon.name}</h5>
        <p>Type: {pokemon.type}</p>
        <p>Level: {pokemon.level}</p>
        <button onClick={() => selectPokemon(pokemon.pokemon_num)} 
        className="profile-button">View Profile</button>
        <button  onClick={() => deletePokemonFromPokedex(pokemon.pokemon_num)} 
        className="delete-button">Delete</button>
       </Card.Body>
      </Card>
  ))}
  </Row>
</Container>
<Footer/>
</div>
  )}
export default Pokedex;
