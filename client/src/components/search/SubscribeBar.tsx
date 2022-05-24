import React, { Dispatch } from 'react';
import { Box, Button } from '@mui/material';

import { Periodicy, SubscriptionConfig } from '../../types/types';
import { Dropdown } from './Dropdown';

const subscribeBarContainer = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const periodicies: { [key: string]: string } = {
  daily: 'Daily',
  weekly: 'Weekly',
  monthly: 'Monthly',
};

interface SubscribeBarProps {
  subscribe: () => void;
  subConfig: SubscriptionConfig;
  setSubConfig: Dispatch<SubscriptionConfig>;
}

const SubscribeBar = (props: SubscribeBarProps) => (
  <Box sx={subscribeBarContainer}>
    <Dropdown
      name='Periodicy'
      values={periodicies}
      value={props.subConfig.periodicy}
      updateValue={(value) => {
        props.setSubConfig({
          ...props.subConfig,
          periodicy: value as Periodicy,
        });
      }}
    />
    <Button
      sx={{ height: '56px' }}
      fullWidth
      variant='contained'
      color='secondary'
      onClick={props.subscribe}
    >
      Subscribe
    </Button>
  </Box>
);

export default SubscribeBar;
