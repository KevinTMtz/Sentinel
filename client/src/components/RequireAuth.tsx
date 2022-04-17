import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();

  if (true) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
