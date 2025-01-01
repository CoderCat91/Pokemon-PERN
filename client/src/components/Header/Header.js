import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import './Header.scss'
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
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className='navbar-col'>
        <Nav className="me-auto">
        <NavLink to='/' style={{ textDecoration: 'none', color: 'black', alignSelf: 'center' }}>
  <span>Home</span>
          </NavLink>
          <NavLink to='/pokemon' style={{ textDecoration: 'none', color: 'black', alignSelf: 'center' }}>
            <div className="hexagon"><span>Pokémon</span></div>
          </NavLink>
          {isAuth ? (
          <div className='auth-div'>
            <NavLink to='/pokedex' style={{ textDecoration: 'none', color: 'black', alignSelf: 'center' }}>
              <div className='hexagon'><span>Pokédex</span></div>
            </NavLink>
            <button onClick={() => signOut()} className='logout-button' style={{ alignSelf: 'center', fontWeight: 'bolder', boxShadow: '2px 2px 2px 2px #cecccc' }}>
              Logout
            </button>
          </div>
        ) : (
          <div className='log-div'>
            <NavLink to='/login' style={{ textDecoration: 'none', color: 'black', alignSelf: 'center' }}>
              <div className="hexagon"><span>Login</span></div>
            </NavLink>

            <NavLink to='/register' style={{ textDecoration: 'none', color: 'black', alignSelf: 'center' }}>
             <div className='hexagon'><span>Register</span></div> 
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
