import React, { Dispatch } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { Periodicy, SubscriptionConfig } from '../../types/types';
import { Dropdown } from '../utils/Dropdown';

const subscribeBarContainer = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '8px',
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
  buttonColor?: any;
  buttonText: string;
}

const SubscribeBar = (props: SubscribeBarProps) => (
  <Box sx={subscribeBarContainer}>
    <Box sx={{ minWidth: '236px' }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          label='Start date'
          disableFuture
          value={new Date(props.subConfig.startDate)}
          onChange={(value) =>
            value &&
            props.setSubConfig({
              ...props.subConfig,
              startDate: value,
            })
          }
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </Box>

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
      color={props.buttonColor}
      onClick={props.subscribe}
    >
      {props.buttonText}
    </Button>
  </Box>
);

export default SubscribeBar;
