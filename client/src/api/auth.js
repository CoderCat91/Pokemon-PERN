import axios from 'axios'
axios.defaults.withCredentials = true

export async function onRegistration(registrationData) {
  return await axios.post(
    'https://pokemon-pern.onrender.com/api/register',
    registrationData
  )
}

export async function onLogin(loginData) {
  const response = await axios.post('https://pokemon-pern.onrender.com/api/login', loginData);
  return response.data; 
}


export async function onLogout() {
  return await axios.get('https://pokemon-pern.onrender.com/api/logout')
}

export async function fetchProtectedInfo() {
  return await axios.get('https://pokemon-pern.onrender.com/api/protected')
}
