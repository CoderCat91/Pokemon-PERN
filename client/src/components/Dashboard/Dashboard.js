import { useEffect, useState, useContext } from 'react'
import { useDispatch } from 'react-redux'
import { fetchProtectedInfo, onLogout } from '../../api/auth'
import { unauthenticateUser } from '../../redux/slices/authSlice'
import SearchBar from '../SearchBar/SearchBar'
import Header from '../Header/Header'
import { PokemonContext } from '../../context/PokemonContext'
import PokemonFinder from '../../api/PokemonFinder'
import './Dashboard.scss';
import SearchResultsList from '../SearchBar/SearchResultsList'

const Dashboard = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [protectedData, setProtectedData] = useState(null);
  const [results, setResults] = useState([]);
  
  const { pokemons, setPokemons } = useContext(PokemonContext);
    useEffect(() => {
        (async () => {
          try {
            const response = await PokemonFinder.get("/");
            console.log(response.data.data.pokemon);
            setPokemons(response.data.data.pokemon)
          } catch (err) {
            console.log(err);
          }
        })();  // making sure you run the function, not just defining it!
      }, [setPokemons]);


  const logout = async (props) => {
    try {
      await onLogout()

      dispatch(unauthenticateUser())
      localStorage.removeItem('isAuth')
    } catch (error) {
      console.log(error.response)
    }
  }

  const protectedInfo = async () => {
    try {
      const { data } = await fetchProtectedInfo()

      setProtectedData(data.info)

      setLoading(false)
    } catch (error) {
      logout()
    }
  }

  useEffect(() => {
    protectedInfo()
  }, [])

  return loading ? (
    <div>
    <Header/>
      <h1>Loading...</h1>
      </div>
  ) : (
    <div>
      <Header/>
          <div className="search-bar-container">
        <SearchBar setResults={setResults} />
        {results && results.length > 0 && <SearchResultsList results={results} />}
      </div>
        <h1>Dashboard</h1>
        <div className="list-group container">
        <table className="table table-hover table-dark">
          <thead>
            <tr className="bg-primary">
            <th scope="col">PokeDex No.</th>
            <th scope ='col'>Image</th>
              <th scope="col">Name</th>
              <th scope="col">Type</th>
              <th scope="col">Health</th>
              <th scope="col">Attacks</th>
              <th scope="col">Evolves into:</th>
              <th scope='col'>Rating</th>
              <th scope="col">Profile</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {pokemons && pokemons
             .sort(({ id: previousID }, { id: currentID }) => previousID - currentID)
             .map((pokemon) => {
        return (
   <tr>
   <td>{pokemon.pokemon_num}</td>
   <td className='dashboard-images'><img src={pokemon.images} alt='pokemon'/></td>
   <td>{pokemon.name}</td>
   <td>{pokemon.type}</td>
   <td>{pokemon.health}</td>
   <td>{pokemon.attacks}</td>
   <td>{pokemon.evolves_into}</td>
   <td>rating</td>
   <td><button className='btn btn-danger'>Profile</button></td>
   <td><button className='btn btn-warning'>Delete</button></td>
</tr>
                )
            })}
          </tbody>
        </table>
      </div>
        <h2>{protectedData}</h2>
    </div>
  )
}

export default Dashboard
