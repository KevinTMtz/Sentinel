import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';

import AuthForm from '../../components/auth/AuthForm';
import SnackBar from '../../components/utils/Snackbar';
import Spinner from '../../components/utils/Spinner';
import { firebaseAuth } from '../../config/firebase';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [warning, setWarning] = useState<string>();
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const Login = async () => {
    if (email === undefined) {
      setWarning('Please enter your email');
      handleClick();
      return;
    }
    if (password === undefined || password?.length < 5) {
      setWarning('Please enter a valid password');
      handleClick();
      return;
    }

    setIsAuth(true);

    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        navigate('search');
      })
      .catch((error) => {
        console.log('Error: ' + error.code + ', Message: ' + error.message);
      });
  };

  return (
    <div>
      {isAuth ? (
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
            authenticate={Login}
          />
          <SnackBar warning={warning} setOpen={setOpen} open={open} />
        </>
      )}
    </div>
  );
};

export default Login;
