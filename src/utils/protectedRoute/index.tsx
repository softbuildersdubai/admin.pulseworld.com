import { ReactNode } from 'react';
// ROUTER
import { Navigate } from 'react-router-dom';
// REDUX
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { accessToken } = useSelector((state: RootState) => state.user);
  if (!accessToken) {
    // user is not authenticated
    return <Navigate to="/auth/login" />;
  }
  return children;
};
