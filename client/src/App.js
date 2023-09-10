import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom'
import Dashboard from './components/Dashboard/Dashboard'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Register from './components/Register/Register';
import PokeDex from './components/PokeDex/PokeDex';
import PokemonDetails from './components/PokemonDetails/PokemonDetails'
import { useSelector } from 'react-redux';
import './App.css';
import {PokemonContextProvider} from './context/PokemonContext'
const PrivateRoutes = () => {
  
  const { isAuth } = useSelector((state) => state.auth)

  return <>{isAuth ? <Outlet /> : <Navigate to='/login' />}</>
}

const RestrictedRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth)

  return <>{!isAuth ? <Outlet /> : <Navigate to='/dashboard' />}</>
}

const App = () => {
  return (
    <PokemonContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/pokedex' element={<PokeDex />} />
        <Route path='/details/:id' element={<PokemonDetails />} />
        <Route element={<PrivateRoutes />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>

        <Route element={<RestrictedRoutes />}>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </PokemonContextProvider>
  )
}

export default App
