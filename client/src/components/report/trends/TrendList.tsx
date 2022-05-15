import React from 'react';
import { Box } from '@mui/material';

import TrendRow from './TrendRow';
import { Trend } from '../../../types/types';

const listStyle = {
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  gap: '8px',
};

interface TrendListProps {
  trends: Trend[];
}

const TrendList = (props: TrendListProps) => (
  <Box sx={listStyle}>
    {props.trends &&
      props.trends.map((trend: any, index: number) => (
        <TrendRow key={`trend-row-${trend.id}-${index}`} trend={trend} />
      ))}
  </Box>
);

export default TrendList;
