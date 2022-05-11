import React from 'react';
import { Box, Typography } from '@mui/material';

import { ReportSearchProps } from '../../types/types';

const cardStyle = {
  padding: '16px',
  transition: 'all 0.2s ease-out',
  userSelect: 'none',
  border: '1px solid #3874CB',
  borderRadius: '4px',
  '&:hover': { transform: 'scale(1.005)' },
};

interface ReportRowProps {
  report: ReportSearchProps;
  createdAt: string;
}

const ReportRow = (props: ReportRowProps) => {
  return (
    <Box sx={cardStyle}>
      <Typography variant='h5'>
        <strong>Topic: {props.report.topic}</strong>
      </Typography>
      <Typography variant='h6'>
        Created at: {new Date(props.createdAt).toLocaleDateString()}{' '}
        {new Date(props.createdAt).toLocaleTimeString()}
      </Typography>
    </Box>
  );
};

export default ReportRow;
