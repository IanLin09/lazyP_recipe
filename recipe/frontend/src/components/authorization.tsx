import { auth } from '@/utils/cookie';
import { ReactNode } from 'react';
import { useLocation, Navigate } from 'react-router-dom';


interface Props {
    children: ReactNode
}

const Authorization = ({ children }:Props) => {
  const location = useLocation();
  const isAuthenticated = auth.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/404" state={{ from: location }} replace />;
  }

  return children;
};

export default Authorization