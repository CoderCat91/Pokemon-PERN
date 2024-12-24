import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import './Header.scss'
import logo from '../../images/Pokemon_logo_PNG2.png'
import { AuthContext } from '../../context/authContext'
import { onLogout } from '../../api/auth'
import {Navbar, Container, Nav} from 'react-bootstrap'

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
    <Navbar expand="lg" className="header-wrapper">
    <Container fluid className='header-container'>
    <Navbar.Brand href='/' className='header-logo'>      
            <img src={logo} alt='pokemon' />
        </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className='navbar-col'>
        <Nav className="me-auto">
        <NavLink to='/' style={{ textDecoration: 'none', color: 'black', alignSelf: 'center' }}>
            <span>Home</span>
          </NavLink>
          <NavLink to='/pokemon' style={{ textDecoration: 'none', color: 'black', alignSelf: 'center' }}>
            <span>Pokémon</span>
          </NavLink>
          {isAuth ? (
          <div className='auth-div'>
            <NavLink to='/pokedex' style={{ textDecoration: 'none', color: 'black', alignSelf: 'center' }}>
              <span>Pokédex</span>
            </NavLink>
            <button onClick={() => signOut()} className='logout-button' style={{ alignSelf: 'center', fontWeight: 'bolder', boxShadow: '2px 2px 2px 2px #cecccc' }}>
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
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Header
