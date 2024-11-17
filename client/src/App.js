import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthContextProvider, AuthContext } from './context/authContext'; // Import context
import Pokedex from './components/Pokedex/Pokedex';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Pokemon from './components/Pokemon/Pokemon';
import PokemonDetails from './components/PokemonDetails/PokemonDetails'
import { PokemonContextProvider} from './context/PokemonContext'

const PrivateRoutes = () => {
  const { isAuth } = useContext(AuthContext); 

  return isAuth ? <Outlet /> : <Navigate to='/login' />;
};

const RestrictedRoutes = () => {
  const { isAuth } = useContext(AuthContext);

  return !isAuth ? <Outlet /> : <Navigate to='/dashboard' />;
};

const App = () => {
  return (
    <div>
      <AuthContextProvider>
    <PokemonContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/pokemon' element={<Pokemon />} />
        <Route path='/details/:id' element={<PokemonDetails/>} />
        <Route element={<PrivateRoutes />}>
          <Route path='/pokedex' element={<Pokedex />} />
        </Route>

        <Route element={<RestrictedRoutes />}>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </PokemonContextProvider>
    </AuthContextProvider>
    </div>
  );
};

export default App;
