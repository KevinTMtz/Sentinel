import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { firebaseAuth } from '../../config/firebase';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();

  useEffect(() =>
    firebaseAuth.onAuthStateChanged((user) => {
      if (!user) navigate('/login');
    }),
  );

  return children;
};

export default RequireAuth;
