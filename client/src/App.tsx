import React from 'react';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { signOut } from 'firebase/auth';

import TweetList from './components/TweetList';
import LandingPage from './containers/LandingPage';
import RequireAuth from './components/auth/RequireAuth';
import Login from './containers/auth/Login';
import Register from './containers/auth/Register';
import { firebaseAuth } from './config/firebase';

const appStyle = {
  padding: '16px 32px',
};

const App = () => {
  // TODO
  console.log(firebaseAuth.currentUser);

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div>
      <AppBar position='static'>
        <Toolbar variant='dense'>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Sentinel
          </Typography>

          {location.pathname !== '/register' &&
            location.pathname !== '/login' &&
            (firebaseAuth.currentUser ? (
              <Button
                color='inherit'
                onClick={() => {
                  signOut(firebaseAuth)
                    .then(() => {
                      navigate('/');
                    })
                    .catch((error) => {
                      console.log(
                        'Error: ' + error.code + ', Message: ' + error.message,
                      );
                    });
                }}
              >
                Log out
              </Button>
            ) : (
              <Button color='inherit' onClick={() => navigate('login')}>
                Login
              </Button>
            ))}
        </Toolbar>
      </AppBar>

      <div style={appStyle}>
        <Routes>
          <Route path='/'>
            <Route index element={<LandingPage />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />

            <Route
              path='search'
              element={
                <RequireAuth>
                  <TweetList />
                </RequireAuth>
              }
            />

            <Route path='*' element={<Navigate to='/' replace />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
