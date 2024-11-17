import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import './Header.scss'
import logo from '../../images/Pokemon_logo_PNG2.png'
import { AuthContext } from '../../context/authContext'
import { onLogout } from '../../api/auth'

const Header = () => {
  const { isAuth, unauthenticateUser } = useContext(AuthContext) 

  const signOut = async () => {
    try {
      await onLogout()

      unauthenticateUser() 
      localStorage.removeItem('isAuth') 
    } catch (error) {
      console.log(error.response)
    }
  }

  return (
    <div className='header-wrapper'>
      <ul>
        <div className='home-div'>
          <NavLink to='/' style={{ textDecoration: 'none', color: 'black', alignSelf: 'center' }}>
            <span>Home</span>
          </NavLink>
          <NavLink to='/pokemon' style={{ textDecoration: 'none', color: 'black', alignSelf: 'center' }}>
            <span>Pokémon</span>
          </NavLink>
        </div>

        <div className='header-logo'>
          <NavLink to='/'>
            <img src={logo} alt='pokemon' />
          </NavLink>
        </div>

        {isAuth ? (
          <div className='auth-div'>
            <NavLink to='/pokedex' style={{ textDecoration: 'none', color: 'black', alignSelf: 'center' }}>
              <span>Pokédex</span>
            </NavLink>
            <button onClick={() => signOut()} className='btn btn-danger btn-lg' style={{ alignSelf: 'center', fontWeight: 'bolder', boxShadow: '2px 2px 2px 2px #cecccc' }}>
              Logout
            </button>
          </div>
        ) : (
          <div className='log-div'>
            <NavLink to='/login' style={{ textDecoration: 'none', color: 'black', alignSelf: 'center' }}>
              <span>Login</span>
            </NavLink>

            <NavLink to='/register' style={{ textDecoration: 'none', color: 'black', alignSelf: 'center' }}>
              <span>Register</span>
            </NavLink>
          </div>
        )}
      </ul>
    </div>
  )
}

export default Header
