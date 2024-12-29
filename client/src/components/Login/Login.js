import { useState, useContext } from 'react'
import { onLogin } from '../../api/auth'
import Footer from '../Footer/Footer'
import {NavLink} from 'react-router-dom'
import { AuthContext } from '../../context/authContext';
import {Row, Col, Container} from 'react-bootstrap'
import logo from '../../images/Pokemon_logo_PNG2.png'
import charizard from '../../images/ezgif.com-webp-to-png (6).png';
import './Login.scss';

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState(false); 
  const { authenticateUser } = useContext(AuthContext) 

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const { userId } = await onLogin(values); 
      console.log(values);
      
      authenticateUser(); 
      localStorage.setItem('isAuth', 'true'); 
      localStorage.setItem('userId', userId);
      console.log(localStorage); 

    } catch (error) {
      console.log(error.response.data.errors[0].msg);
      setError(error.response.data.errors[0].msg) 
    }
  }


  return (
    <>
    <div className='login-page'>
    <div className='pokemon-logo'>
      <img src={logo} alt="pokemon logo"/>
    </div>
    <p className='slogan'>Gotta catch 'em all!</p>
      <Container fluid className='login-wrapper'>
        <Row>
          <Col xl={6}>
        <div className='login-inner'>
          <form onSubmit={(e) => onSubmit(e)} className='container mt-3'>
            <h1>Login</h1>

            <div className='mb-3'>
              <label htmlFor='email' className='form-label'>
                Email address
              </label>
              <input
                onChange={(e) => onChange(e)}
                type='email'
                className='form-control'
                id='email'
                name='email'
                value={values.email}
                required
              />
            </div>

            <div className='mb-3'>
              <label htmlFor='password' className='form-label'>
                Password
              </label>
              <input
                onChange={(e) => onChange(e)}
                type='password'
                value={values.password}
                className='form-control'
                id='password'
                name='password'
                required
              />
            </div>

            <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>

            <button type='submit' className='login-button'>
              Submit
            </button>
            <p className="sign-up-link">New to this Pokedex?  <NavLink to='/register'><span>Sign up!</span></NavLink></p>
          </form>
        
         
        </div>
        </Col>
        <Col xl={6}>
        <div className='picture-wrapper'>
          <img src={charizard} alt='charizard' />
        </div>
        </Col>
        </Row>
      </Container>
    </div>
  <Footer/>
  </>
  )
}

export default Login
