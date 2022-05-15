import React from 'react';
import { Box, Typography } from '@mui/material';

import { Trend } from '../../../types/types';

const rowStyle = {
  padding: '8px',
  transition: 'all 0.2s ease-out',
  userSelect: 'none',
  border: '1px solid #3874CB',
  borderRadius: '4px',
  margin: '8px 0px',
  maxWidth: '200px',
  width: 'auto',
};

interface TrendRowProps {
  trend: Trend;
}

const TrendRow = (props: TrendRowProps) => (
  <Box sx={rowStyle}>
    <Typography variant='subtitle1' textAlign='center'>
      {props.trend.name}
    </Typography>
    <Typography variant='subtitle2' textAlign='center'>
      <strong>Tweet volume: {props.trend.tweetVolume}</strong>
    </Typography>
  </Box>
);

export default TrendRow;
