import React from 'react';
import { IconButton, Snackbar, SnackbarContent } from '@mui/material';
import { Close } from '@mui/icons-material';

const loginWarningStyle = {
  backgroundColor: 'white',
  color: 'red',
  border: '1px solid red',
  textAlign: 'center',
};

interface AuthSnackbarProps {
  warning: string | undefined;
  open: boolean | undefined;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SnackBar: React.FC<AuthSnackbarProps> = (props: AuthSnackbarProps) => {
  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={props.open}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <SnackbarContent
        message={props.warning}
        sx={loginWarningStyle}
        action={
          <>
            <IconButton
              size='small'
              aria-label='close'
              color='inherit'
              onClick={handleClose}
            >
              <Close fontSize='small' />
            </IconButton>
          </>
        }
      />
    </Snackbar>
  );
};

export default SnackBar;
