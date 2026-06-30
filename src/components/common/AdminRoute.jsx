import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../constants/routes';

const AdminRoute = ({ children, requiredPermission }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.ADMIN_LOGIN} state={{ from: location.pathname }} replace />;
  }

  if (user?.role !== 'admin') {
    return <Navigate to={ROUTES.UNAUTHORIZED} replace />;
  }

  if (requiredPermission) {
    const permissions = user?.permissions || [];
    const allowed = permissions.includes('*') || permissions.includes(requiredPermission);
    if (!allowed) {
      return <Navigate to={ROUTES.UNAUTHORIZED} replace />;
    }
  }

  return children;
};

export default AdminRoute;
