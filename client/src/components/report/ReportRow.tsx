import React from 'react';
import { Box, Typography } from '@mui/material';

import { ReportSearchProps } from '../../types/types';
import {
  getDateAndTime,
  upperCaseFirstLetter,
} from '../../functions/utils/utils';

const cardStyle = {
  padding: '16px',
  transition: 'all 0.2s ease-out',
  userSelect: 'none',
  border: '1px solid #3874CB',
  borderRadius: '4px',
  '&:hover': { transform: 'scale(1.005)' },
  cursor: 'pointer',
};

interface ReportRowProps {
  report: ReportSearchProps;
  createdAt: string;
  onClick: () => void;
}

const ReportRow = (props: ReportRowProps) => (
  <Box sx={cardStyle} onClick={props.onClick}>
    <Typography variant='h5'>
      <strong>Topic: {upperCaseFirstLetter(props.report.topic)}</strong>
    </Typography>
    <Typography variant='h6'>
      Created at: {getDateAndTime(props.createdAt)}
    </Typography>
  </Box>
);

export default ReportRow;
