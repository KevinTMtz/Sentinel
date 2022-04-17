import React from 'react';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import TweetList from './components/TweetList';
import LandingPage from './containers/LandingPage';
import Auth from './components/Auth';
import RequireAuth from './components/RequireAuth';

const appStyle = {
  padding: '16px 32px',
};

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div>
      <AppBar position='static'>
        <Toolbar variant='dense'>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Sentinel
          </Typography>

          {location.pathname !== '/auth' && true && (
            <Button color='inherit' onClick={() => navigate('auth')}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <div style={appStyle}>
        <Routes>
          <Route path='/'>
            <Route index element={<LandingPage />} />
            <Route path='auth' element={<Auth />} />

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
