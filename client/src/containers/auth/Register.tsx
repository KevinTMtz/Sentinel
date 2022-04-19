import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import AuthForm from '../../components/auth/AuthForm';
import SnackBar from '../../components/utils/Snackbar';
import Spinner from '../../components/utils/Spinner';
import { firebaseAuth } from '../../config/firebase';

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmation, setConfirmation] = useState<string>();
  const [warning, setWarning] = useState<string>();
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const Register = async () => {
    if (name === undefined) {
      setWarning('Please enter your full name');
      handleClick();
      return;
    }
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
    if (password !== confirmation) {
      setWarning('The passwords do not match');
      handleClick();
      return;
    }

    setIsAuth(true);

    createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        navigate('/search');
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
        <div>
          <AuthForm
            title='Sign up'
            type='register'
            warning={warning}
            setWarning={setWarning}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            confirmation={confirmation}
            setConfirmation={setConfirmation}
            authenticate={Register}
          />
          <SnackBar warning={warning} open={open} setOpen={setOpen} />
        </div>
      )}
    </div>
  );
};

export default Register;
