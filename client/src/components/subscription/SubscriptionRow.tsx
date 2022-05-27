import React from 'react';
import { Box, Typography } from '@mui/material';

import { Subscription } from '../../types/types';
import { upperCaseFirstLetter } from '../../functions/utils/utils';

const cardStyle = {
  padding: '16px',
  transition: 'all 0.2s ease-out',
  userSelect: 'none',
  border: '1px solid #3874CB',
  borderRadius: '4px',
  '&:hover': { transform: 'scale(1.005)' },
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
};

interface SubscriptionRowProps {
  subscription: Subscription;
  onClick: () => void;
}

const SubscriptionRow = (props: SubscriptionRowProps) => (
  <Box sx={cardStyle} onClick={props.onClick}>
    <Box>
      <Typography variant='h5'>
        <strong>
          Topic: {upperCaseFirstLetter(props.subscription.query.topic)}
        </strong>
      </Typography>
      <Typography variant='h6'>
        Periodicy: {upperCaseFirstLetter(props.subscription.config.periodicy)}
      </Typography>
    </Box>
    <Box>
      <Typography
        variant='h6'
        color={props.subscription.config.isActive ? 'green' : 'red'}
      >
        {props.subscription.config.isActive ? 'Active' : 'Inactive'}
      </Typography>
    </Box>
  </Box>
);

export default SubscriptionRow;
