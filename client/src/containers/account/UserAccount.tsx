import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
  updateProfile,
  User,
} from 'firebase/auth';

import AccountForm from '../../components/account/AccountForm';
import SnackBar from '../../components/utils/Snackbar';
import Spinner from '../../components/utils/Spinner';
import { firebaseAuth } from '../../config/firebase';

const UserAccount = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [currentUser, setCurrentUser] = useState<User | null>();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmation, setConfirmation] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);

  const [warning, setWarning] = useState<string>('');
  const [open, setOpen] = useState(false);

  firebaseAuth.onAuthStateChanged((user) => setCurrentUser(user));

  useEffect(() => {
    const GetInfo = async () => {
      setIsLoading(true);

      firebaseAuth.onAuthStateChanged((user) => {
        if (user !== null) {
          setName(user.displayName ?? '');
          setEmail(user.email ?? '');
          setIsLoading(false);
        }
      });
    };

    GetInfo();
  }, []);

  const openSnackBar = () => setOpen(true);

  const showError = (error: string) => {
    setWarning(error);
    openSnackBar();

    setIsLoading(false);
  };

  const UpdateUser = async () => {
    if (name === '') {
      setWarning('Please enter your full name');
      openSnackBar();
      return;
    }

    if (email === '') {
      setWarning('Please enter a valid email');
      openSnackBar();
      return;
    }

    if (password === '' || password?.length < 5) {
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

    if (currentUser)
      reauthenticateWithCredential(
        currentUser,
        EmailAuthProvider.credential(currentUser.email!, password),
      ).then(
        async () =>
          await updateEmail(currentUser, email)
            .then(() =>
              updateProfile(currentUser, {
                displayName: name,
              })
                .then(() => navigate('/search'))
                .catch((error) => showError(error.message)),
            )
            .catch((error) => showError(error.message)),
        (error) => showError(error.message),
      );
  };

  const DeleteUser = async () => {
    if (password === '') {
      setWarning('Please enter your password');
      openSnackBar();
      return;
    }

    if (password !== confirmation) {
      setWarning('The passwords do not match');
      openSnackBar();
      return;
    }

    setIsLoading(true);

    if (currentUser && currentUser?.uid)
      reauthenticateWithCredential(
        currentUser,
        EmailAuthProvider.credential(currentUser.email!, password),
      ).then(
        async () =>
          await deleteUser(currentUser)
            .then(() => {
              navigate('/');
            })
            .catch((error) => showError(error.message)),
        (error) => showError(error.message),
      );
  };

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <AccountForm
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            confirmation={confirmation}
            setConfirmation={setConfirmation}
            disabled={disabled}
            setDisabled={setDisabled}
            delete={DeleteUser}
            update={UpdateUser}
          />
          <SnackBar warning={warning} setOpen={setOpen} open={open} />
        </>
      )}
    </div>
  );
};

export default UserAccount;
