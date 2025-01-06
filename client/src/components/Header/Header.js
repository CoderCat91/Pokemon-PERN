import { useContext} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './Header.scss'
import { AuthContext } from '../../context/authContext'
import { onLogout } from '../../api/auth'
import {Navbar, Container, Nav} from 'react-bootstrap'

const Header = () => {
  const navigate = useNavigate();
  const { isAuth, unauthenticateUser } = useContext(AuthContext) 
  const signOut = async () => {
    try {
      await onLogout()
      unauthenticateUser() 
      localStorage.removeItem('isAuth');
      navigate('/');
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
        <NavLink to='/'>
  <span>Home</span>
          </NavLink>
          <NavLink to='/pokemon'>
          <span>Pokémon</span>
          </NavLink>
          {isAuth ? (
            <>
            <NavLink to='/pokedex' >
           <span>Pokédex</span>
            </NavLink>
            <button className="logout-button" onClick={() => signOut()}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to='/login'>
            <span>Login</span>
            </NavLink>

            <NavLink to='/register'>
             <span>Register</span>
            </NavLink>
            </>
        )}
        
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Header
