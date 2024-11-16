import { useState, useContext } from 'react'
import { onLogin } from '../../api/auth'
import { AuthContext } from '../../context/authContext' // Import AuthContext
import Header from '../Header/Header';
import charizard from '../../images/ezgif.com-webp-to-png (6).png'
import './Login.scss';

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState(false)

  const { authenticateUser } = useContext(AuthContext) // Access authenticateUser from context

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      await onLogin(values)
      authenticateUser() // Call authenticateUser from context

      localStorage.setItem('isAuth', 'true') // Store the auth state in localStorage
    } catch (error) {
      console.log(error.response.data.errors[0].msg)
      setError(error.response.data.errors[0].msg) // Set the error message if login fails
    }
  }

  return (
    <div>
      <Header />
      <div className='main-wrapper'>
        <div className='login-wrapper'>
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
                placeholder='Your email...'
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
                placeholder='Password'
                required
              />
            </div>

            <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>

            <button type='submit' className='btn btn-danger'>
              Submit
            </button>
          </form>
        </div>
        <div className='picture-wrapper'>
          <img src={charizard} alt='charizard' />
        </div>
      </div>
    </div>
  )
}

export default Login

