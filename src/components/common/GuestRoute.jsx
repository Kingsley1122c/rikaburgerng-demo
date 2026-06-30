import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../constants/routes';

const GuestRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={user?.role === 'admin' ? ROUTES.ADMIN_DASHBOARD : ROUTES.ACCOUNT} replace />;
  }

  return children;
};

export default GuestRoute;
