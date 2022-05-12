import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, TextField, Typography } from '@mui/material';
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

interface AccountFormProps {
  name: string | undefined;
  setName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  confirmation: string;
  setConfirmation: React.Dispatch<React.SetStateAction<string>>;
  disabled: boolean;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  delete: () => Promise<void>;
  update: () => Promise<void>;
}

const AccountForm: React.FC<AccountFormProps> = (props: AccountFormProps) => {
  const navigate = useNavigate();

  return (
    <Container sx={centerForm}>
      <header>
        <Typography variant='h4' align='center' style={{ margin: '15px auto' }}>
          My account
        </Typography>
      </header>
      <form style={styles.displayRows} onSubmit={(e) => e.preventDefault()}>
        <TextField
          variant='outlined'
          label='Name:'
          onChange={(event) => {
            props.setName(event.target.value);
          }}
          disabled={props.disabled}
          value={props.name}
        />
        <TextField
          variant='outlined'
          label='E-mail:'
          onChange={(event) => props.setEmail(event.target.value)}
          type='email'
          disabled={props.disabled}
          value={props.email}
        />
        {!props.disabled && (
          <>
            <TextField
              variant='outlined'
              label='Password:'
              onChange={(event) => props.setPassword(event.target.value)}
              type='password'
              disabled={props.disabled}
            />
            <TextField
              type='password'
              variant='outlined'
              label='Repeat password:'
              onChange={(event) => {
                props.setConfirmation(event.target.value);
              }}
              disabled={props.disabled}
            />
          </>
        )}
        <Box sx={styles.displayRowsButtons}>
          {props.disabled ? (
            <>
              <Button
                variant='contained'
                color='primary'
                onClick={() => props.setDisabled(false)}
              >
                Edit
              </Button>
              <Button variant='outlined' onClick={() => navigate('/search')}>
                Return home
              </Button>
            </>
          ) : (
            <>
              <Button
                variant='contained'
                color='primary'
                onClick={() => props.update()}
              >
                Update my account
              </Button>
              <Button
                variant='contained'
                color='secondary'
                onClick={() => {
                  props.setDisabled(true);
                  props.delete();
                }}
              >
                Delete my account
              </Button>
              <Button
                variant='outlined'
                onClick={() => {
                  props.setDisabled(true);
                }}
              >
                Cancel
              </Button>
            </>
          )}
        </Box>
      </form>
    </Container>
  );
};

export default AccountForm;
