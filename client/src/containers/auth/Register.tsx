import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  User,
} from 'firebase/auth';

import AuthForm from '../../components/auth/AuthForm';
import SnackBar from '../../components/utils/Snackbar';
import Spinner from '../../components/utils/Spinner';
import { firebaseAuth } from '../../config/firebase';

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmation, setConfirmation] = useState<string>('');
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

  const register = async () => {
    if (name === '') {
      setWarning('Please enter your full name');
      openSnackBar();
      return;
    }

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

    if (password !== confirmation) {
      setWarning('The passwords do not match');
      openSnackBar();
      return;
    }

    setIsLoading(true);

    createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        updateProfile(firebaseAuth.currentUser as User, {
          displayName: name,
        })
          .then(() => {
            navigate('/search');
          })
          .catch((error) => {
            showError(error.message);
          });
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
            authenticate={register}
          />
          <SnackBar warning={warning} open={open} setOpen={setOpen} />
        </div>
      )}
    </div>
  );
};

export default Register;
