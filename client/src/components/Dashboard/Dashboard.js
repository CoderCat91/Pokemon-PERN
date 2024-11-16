import { useEffect, useState, useContext } from 'react';
import { fetchProtectedInfo, onLogout } from '../../api/auth';
import { AuthContext } from '../../context/authContext';
import SearchBar from '../SearchBar/SearchBar';
import Header from '../Header/Header';
import DashboardFinder from '../../api/DashboardFinder';
import './Dashboard.scss';
import SearchResultsList from '../SearchBar/SearchResultsList';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [protectedData, setProtectedData] = useState(null);
  const [results, setResults] = useState([]);
  const [dashboardData, setDashboardData] = useState([]); 

  const { isAuth, unauthenticateUser } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      try {
        const response = await DashboardFinder.get("/");
        console.log(response.data.data.pokemon);
        setDashboardData(response.data.data.pokemon); 
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const deletePokemonFromDashboard = async (pokemon_num) => {
    try {
      await DashboardFinder.delete(`/${pokemon_num}`);
      setDashboardData(dashboardData.filter(pokemon => pokemon.pokemon_num !== pokemon_num));
    } catch (err) {
      console.error("Error deleting Pokémon:", err);
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

  return loading ? (
    <div>
      <Header />
      <h1>Loading...</h1>
    </div>
  ) : (
    <div>
      <Header />
      <div className="search-bar-container">
        <SearchBar setResults={setResults} />
        {results && results.length > 0 && <SearchResultsList results={results} />}
      </div>
      <h1>PokeDex</h1>
      <div className="list-group container">
        <table className="table table-hover table-dark">
          <thead>
            <tr className="bg-primary">
              <th scope="col">PokeDex No.</th>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Type</th>
              <th scope="col">Health</th>
              <th scope="col">Attacks</th>
              <th scope="col">Evolves into:</th>
              <th scope="col">Rating</th>
              <th scope="col">Profile</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {dashboardData && dashboardData.length > 0 ? (
              dashboardData
                .sort(({ id: previousID }, { id: currentID }) => previousID - currentID)
                .map((poke) => {  
                  console.log(poke)
                  return (                
                  <tr key={poke.id}>
                    <td>{poke.pokemon_num}</td>
                    <td className='dashboard-images'><img src={poke.images} alt='pokemon' /></td>
                    <td>{poke.name}</td>
                    <td>{poke.type}</td>
                    <td>{poke.health}</td>
                    <td>{poke.attacks}</td>
                    <td>{poke.evolves_into}</td>
                    <td>rating</td>
                    <td><button className='btn btn-danger'>Profile</button></td>
                    <td>        <button
                  className="btn btn-warning"
                  onClick={() => deletePokemonFromDashboard(poke.pokemon_num)} // Trigger the delete function
                >
                  Delete
                </button></td>
                  </tr>
                  )
})
            ) : (
              <tr>
                <td colSpan="10">No data available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <h2>{protectedData}</h2>
    </div>
  );
};

export default Dashboard;
