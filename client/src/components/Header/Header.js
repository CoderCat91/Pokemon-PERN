import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import './Header.scss'
import logo from '../../images/Pokemon_logo_PNG2.png'
import { unauthenticateUser } from '../../redux/slices/authSlice'
import { onLogout } from '../../api/auth'

const Header = () => {
  const { isAuth } = useSelector((state) => state.auth)
const dispatch = useDispatch()

  const signOut = async () => {
    try {
      await onLogout()

      dispatch(unauthenticateUser())
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
          <NavLink to='/pokedex' style={{ textDecoration: 'none', color: 'black', alignSelf: 'center' }}>
            <span>PokeDex</span>
          </NavLink>
        </div>

  <div className='header-logo'>
    <NavLink to='/'>
  <img src={logo} alt='pokemon'/>
  </NavLink>
</div>

        {isAuth ? (
         <div className='auth-div'>
            <NavLink to='/dashboard' style={{ textDecoration: 'none', color: 'black', alignSelf: 'center' }}>
              <span>Dashboard</span>
            </NavLink>
            <button onClick={() => signOut()} className='btn btn-danger' style={{height: '40px', alignSelf: 'center' }}>
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
