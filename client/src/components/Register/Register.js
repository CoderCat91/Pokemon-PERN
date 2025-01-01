import { useState } from 'react'
import { onRegistration } from '../../api/auth'
import logo from '../../images/Pokemon_logo_PNG2.png'
import {NavLink} from 'react-router-dom'
import {Container, Row, Col} from 'react-bootstrap'
import Footer from '../Footer/Footer'
import image from '../../images/ezgif.com-webp-to-png (3).png'
import './Register.scss';

const Register = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const { data } = await onRegistration(values)

      setError('')
      setSuccess(data.message)
      setValues({ email: '', password: '' })
    } catch (error) {
      setError(error.response.data.errors[0].msg)
      setSuccess('')
    }
  }

  return (
    <>
    <div className='register-page'>
    <NavLink to='/'>
    <div className='pokemon-logo'>
            <img src={logo} alt="pokemon logo"/>
          </div>
          </NavLink>

          <p className='slogan'>Gotta catch 'em all!</p>
 <Container fluid className='register-wrapper'>
  <Row>
    <Col xl={6}>
  <div className='register-inner'>
      <form onSubmit={(e) => onSubmit(e)} className='container mt-3'>
        <h1>Register</h1>

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
        <div style={{ color: 'green', margin: '10px 0' }}>{success}</div>

        <button type='submit' className='register-button'>
          Submit
        </button>
        <p className="login-link">Already registered?  <NavLink to='/login'><span>Login!</span></NavLink></p>
      </form>
    </div>
    </Col>
    <Col xl={6}>
    <div className='info-wrapper'>
<img src={image} alt='pikachu'/>
  </div>
  </Col>
  </Row>
    </Container>
    </div>
    <Footer/>
    </>
  )
}

export default Register
