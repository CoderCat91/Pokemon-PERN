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
  const token = localStorage.getItem('userToken'); 
  
  if (!token) {
    throw new Error('No authentication token found');
  }

  try {
    const response = await axios.get('https://pokemon-pern.onrender.com/api/protected', {
      headers: {
        'Authorization': `Bearer ${token}` 
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching protected info:', error);
    throw error;
  }
}

