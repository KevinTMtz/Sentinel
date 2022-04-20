import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const centerSpinner = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
};

const Spinner: React.FC = () => (
  <Box sx={centerSpinner}>
    <CircularProgress size={80} />
  </Box>
);

export default Spinner;
