import { deleteUser, updateEmail, updateProfile, User } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AccountForm from '../../components/account/AccountForm';
import SnackBar from '../../components/utils/Snackbar';
import Spinner from '../../components/utils/Spinner';
import { firebaseAuth } from '../../config/firebase';

const UserAccount = () => {
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState<boolean>(false);

  const [currentUser, setCurrentUser] = useState<User | null>();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmation, setConfirmation] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);

  const [warning, setWarning] = useState<string>('');
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  firebaseAuth.onAuthStateChanged((user) => {
    setCurrentUser(user);
  });

  useEffect(() => {
    const GetInfo = async () => {
      setLoading(true);

      firebaseAuth.onAuthStateChanged((user) => {
        if (user !== null) {
          setName(user.displayName ?? '');
          setEmail(user.email ?? '');
          setLoading(false);
        }
      });
    };

    GetInfo();
  }, []);

  const UpdateUser = async () => {
    if (name === undefined) {
      setWarning('Please enter your full name');
      handleClick();
      return;
    }
    if (email === undefined) {
      setWarning('Please enter a valid email');
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
    setLoading(true);

    if (currentUser)
      updateEmail(currentUser, email)
        .then(() => {
          updateProfile(currentUser, {
            displayName: name,
          })
            .then(() => {
              navigate('/search');
            })
            .catch((error) => {
              console.log(
                'Error: ' + error.code + ', Message: ' + error.message,
              );
            });
        })
        .catch((error) => {
          console.log('Error: ' + error.code + ', Message: ' + error.message);
        });
  };

  const DeleteUser = async () => {
    setLoading(true);

    if (currentUser)
      deleteUser(currentUser)
        .then(() => {
          navigate('/');
        })
        .catch((error) => {
          console.log('Error: ' + error.code + ', Message: ' + error.message);
        });
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
