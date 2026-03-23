import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface GatekeeperProps {
  children: React.ReactNode;
}

const Gatekeeper: React.FC<GatekeeperProps> = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('is_authenticated') === 'true';

  if (!isAuthenticated && location.pathname !== '/') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default Gatekeeper;
