import React, { useState } from 'react';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { signOut, User } from 'firebase/auth';

import LandingPage from './containers/LandingPage';
import RequireAuth from './components/auth/RequireAuth';
import Login from './containers/auth/Login';
import Register from './containers/auth/Register';
import { firebaseAuth } from './config/firebase';
import UserAccount from './containers/account/UserAccount';
import Search from './containers/search/Search';
import Reports from './containers/report/Reports';
import ManageReport from './containers/report/ManageReport';
import Subscriptions from './containers/subscription/Subscriptions';
import ManageSubscription from './containers/subscription/ManageSubscription';
import ManageSubscriptionReport from './containers/subscription/ManageSubscriptionReport';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentUser, setCurrentUser] = useState<User | null>();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  firebaseAuth.onAuthStateChanged((user) => setCurrentUser(user));

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const appStyle = {
    padding: location.pathname === '/' ? '0' : '16px 32px',
  };

  return (
    <Box>
      <AppBar position='static'>
        <Toolbar variant='dense'>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            Sentinel
          </Typography>

          {currentUser && (
            <>
              <Button color='inherit' onClick={() => navigate('/search')}>
                Search
              </Button>
              <Button
                color='inherit'
                onClick={() => navigate('/search-reports')}
              >
                Reports
              </Button>
              <Button
                color='inherit'
                onClick={() => navigate('/subscriptions')}
              >
                Subscriptions
              </Button>
            </>
          )}

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
                        .then(() => navigate('/'))
                        .catch((error) =>
                          console.log(
                            'Error: ' +
                              error.code +
                              ', Message: ' +
                              error.message,
                          ),
                        );

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

      <Box sx={appStyle}>
        <Routes>
          <Route path='/'>
            <Route index element={<LandingPage />} />

            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />

            <Route
              path='account'
              element={
                <RequireAuth>
                  <UserAccount />
                </RequireAuth>
              }
            />

            <Route
              path='search'
              element={
                <RequireAuth>
                  <Search />
                </RequireAuth>
              }
            />

            <Route path='search-reports'>
              <Route
                path=''
                element={
                  <RequireAuth>
                    <Reports />
                  </RequireAuth>
                }
              />
              <Route
                path=':reportId'
                element={
                  <RequireAuth>
                    <ManageReport />
                  </RequireAuth>
                }
              />
            </Route>

            <Route path='subscriptions'>
              <Route
                path=''
                element={
                  <RequireAuth>
                    <Subscriptions />
                  </RequireAuth>
                }
              />

              <Route path=':subscriptionId'>
                <Route
                  path=''
                  element={
                    <RequireAuth>
                      <ManageSubscription />
                    </RequireAuth>
                  }
                />
                <Route
                  path=':reportId'
                  element={
                    <RequireAuth>
                      <ManageSubscriptionReport />
                    </RequireAuth>
                  }
                />
              </Route>
            </Route>

            <Route path='*' element={<Navigate to='/' replace />} />
          </Route>
        </Routes>
      </Box>
    </Box>
  );
};

export default App;
