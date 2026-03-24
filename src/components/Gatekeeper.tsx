import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';

const Gatekeeper: React.FC = () => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('is_authenticated') === 'true';

  if (!isAuthenticated && location.pathname !== '/') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default Gatekeeper;
