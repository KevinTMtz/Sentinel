import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';

import AuthForm from '../../components/auth/AuthForm';
import SnackBar from '../../components/utils/Snackbar';
import Spinner from '../../components/utils/Spinner';
import { firebaseAuth } from '../../config/firebase';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [warning, setWarning] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  const openSnackBar = () => {
    setOpen(true);
  };

  const showError = (error: string) => {
    setIsLoading(false);

    setWarning(error);
    openSnackBar();

    setEmail('');
    setPassword('');
  };

  const login = async () => {
    if (email === '') {
      setWarning('Please enter your email');
      openSnackBar();
      return;
    }

    if (password === '' || password.length < 5) {
      setWarning('Please enter a valid password');
      openSnackBar();
      return;
    }

    setIsLoading(true);

    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        navigate('/search');
      })
      .catch((error) => {
        showError(error.message);
      });
  };

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <AuthForm
            title='Login'
            type='login'
            warning={warning}
            setWarning={setWarning}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            authenticate={login}
          />
          <SnackBar warning={warning} setOpen={setOpen} open={open} />
        </>
      )}
    </div>
  );
};

export default Login;
