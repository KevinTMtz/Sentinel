import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { firebaseAuth } from '../../config/firebase';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();

  // TODO
  console.log('Require: ' + firebaseAuth.currentUser);

  if (!firebaseAuth.currentUser)
    return <Navigate to='/login' state={{ from: location }} replace />;

  return children;
};

export default RequireAuth;
