import React, { ReactNode } from 'react';
import { Typography } from '@mui/material';

interface TitleProps {
  children: ReactNode;
}

const Title = ({ children }: TitleProps) => (
  <Typography variant='h4' sx={{ marginBottom: '16px' }}>
    {children}
  </Typography>
);

export default Title;
