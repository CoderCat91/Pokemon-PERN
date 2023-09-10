import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchProtectedInfo, onLogout } from '../../api/auth'
import { unauthenticateUser } from '../../redux/slices/authSlice'
import Header from '../Header/Header';

const Dashboard = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [protectedData, setProtectedData] = useState(null)

  const logout = async () => {
    try {
      await onLogout()

      dispatch(unauthenticateUser())
      localStorage.removeItem('isAuth')
    } catch (error) {
      console.log(error.response)
    }
  }

  const protectedInfo = async () => {
    try {
      const { data } = await fetchProtectedInfo()

      setProtectedData(data.info)

      setLoading(false)
    } catch (error) {
      logout()
    }
  }

  useEffect(() => {
    protectedInfo()
  }, [])

  return loading ? (
    <div>
    <Header/>
      <h1>Loading...</h1>
      </div>
  ) : (
    <div>
      <Header/>
        <h1>Dashboard</h1>
        <h2>{protectedData}</h2>
    </div>
  )
}

export default Dashboard
