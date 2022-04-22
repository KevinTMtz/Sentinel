import React, { useState } from 'react';
import {
  AppBar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { signOut, User } from 'firebase/auth';

import LandingPage from './containers/LandingPage';
import RequireAuth from './components/auth/RequireAuth';
import Login from './containers/auth/Login';
import Register from './containers/auth/Register';
import { firebaseAuth } from './config/firebase';
import { AccountCircle } from '@mui/icons-material';
import UserAccount from './containers/account/UserAccount';
import SearchLayout from './components/layouts/SearchLayout';

const appStyle = {
  padding: '16px 32px',
};

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentUser, setCurrentUser] = useState<User | null>();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  firebaseAuth.onAuthStateChanged((user) => {
    setCurrentUser(user);
  });

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <AppBar position='static'>
        <Toolbar variant='dense'>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1 }}
            onClick={() => navigate(currentUser ? '/search' : '/')}
          >
            Sentinel
          </Typography>

          {location.pathname !== '/register' &&
            location.pathname !== '/login' &&
            (currentUser ? (
              <>
                <IconButton
                  size='large'
                  aria-label='account of current user'
                  aria-controls='menu-appbar'
                  aria-haspopup='true'
                  onClick={handleMenu}
                  color='inherit'
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id='menu-appbar'
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      navigate('/account');
                    }}
                  >
                    Account
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      signOut(firebaseAuth)
                        .then(() => {
                          navigate('/');
                        })
                        .catch((error) => {
                          console.log(
                            'Error: ' +
                              error.code +
                              ', Message: ' +
                              error.message,
                          );
                        });

                      handleClose();
                    }}
                  >
                    Log out
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button color='inherit' onClick={() => navigate('/login')}>
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
            <Route path='account' element={<UserAccount />} />

            <Route
              path='search'
              element={
                <RequireAuth>
                  <SearchLayout />
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
