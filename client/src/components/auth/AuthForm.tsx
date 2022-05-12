import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Container, Typography } from '@mui/material';
import { Box } from '@mui/system';

import { styles } from '../../styles/styles';

const centerForm = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
  width: '40%',
  '@media (max-width: 1000px)': {
    width: '60%',
  },
  '@media (max-width: 600px)': {
    width: '80%',
  },
};

interface AuthFormProps {
  title: string;
  type: 'login' | 'register';
  warning: string | undefined;
  setWarning: React.Dispatch<React.SetStateAction<string | undefined>>;
  name?: string;
  setName?: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  confirmation?: string;
  setConfirmation?: React.Dispatch<React.SetStateAction<string>>;
  authenticate: () => Promise<void>;
}

const AuthForm: React.FC<AuthFormProps> = (props: AuthFormProps) => {
  const navigate = useNavigate();

  return (
    <Container sx={centerForm}>
      <header>
        <Typography variant='h4' align='center' style={{ margin: '15px auto' }}>
          {props.title}
        </Typography>
      </header>
      <form style={styles.displayRows} onSubmit={(e) => e.preventDefault()}>
        {props.type === 'register' && (
          <TextField
            variant='outlined'
            label='Name:'
            required
            onChange={(event) => {
              if (props.setName) props.setName(event.target.value);
            }}
          />
        )}
        <TextField
          variant='outlined'
          label='E-mail:'
          onChange={(event) => props.setEmail(event.target.value)}
          type='email'
          required
        />
        <TextField
          variant='outlined'
          label='Password:'
          onChange={(event) => props.setPassword(event.target.value)}
          type='password'
          required
        />
        {props.type === 'register' && (
          <TextField
            type='password'
            variant='outlined'
            label='Repeat password:'
            required
            onChange={(event) => {
              if (props.setConfirmation)
                props.setConfirmation(event.target.value);
            }}
          />
        )}
        <Box sx={styles.displayRowsButtons}>
          {props.type === 'login' ? (
            <>
              <Button
                variant='contained'
                color='primary'
                type='submit'
                onClick={() => props.authenticate()}
              >
                Sign in
              </Button>
              <Button
                variant='outlined'
                color='secondary'
                onClick={() => navigate('/register')}
              >
                Don't have an account? Sign up
              </Button>
            </>
          ) : (
            <>
              <Button
                variant='contained'
                color='primary'
                type='submit'
                onClick={() => props.authenticate()}
              >
                Sign up
              </Button>
              <Button
                variant='outlined'
                color='secondary'
                onClick={() => navigate('/login')}
              >
                Already have an account? Sign in
              </Button>
            </>
          )}
          <Button variant='outlined' onClick={() => navigate('/')}>
            Cancel
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default AuthForm;
