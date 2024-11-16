import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

const RestrictedRoutes = () => {
  const { isAuth } = useAuth();

  return !isAuth ? <Outlet /> : <Navigate to='/dashboard' />;
};

export default RestrictedRoutes;
