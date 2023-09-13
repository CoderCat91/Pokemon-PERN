import { useState } from 'react'
import { onRegistration } from '../../api/auth'
import Header from '../Header/Header';
import image from '../../images/pngegg (2).png'
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
    <div>
 <Header/>
 <div className='register-wrapper'>
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
        <div style={{ color: 'green', margin: '10px 0' }}>{success}</div>

        <button type='submit' className='btn btn-danger'>
          Submit
        </button>
      </form>
    </div>
    <div className='info-wrapper'>
    <h1>Welcome to the PokeDex!</h1>
    <div className='info-inner'>
    <div className='left'>
<img src={image} alt='pikachu'/>
    </div>
    <div className='right'>
<div className='card'>
  <div className='card-inner'>
    <h3>Welcome!</h3>
    <h4>After you register and login, you can use our Pokedex to create your own!
    Add your favourite Pokemon to your Pokedex and learn more about them!</h4>
  </div>
</div>
    </div>
    </div>
  </div>
    </div>
    </div>
  )
}

export default Register
