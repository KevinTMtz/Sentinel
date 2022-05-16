import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';

import TabPanel from '../../components/navigation/TabPanel';
import SavedReports from './SavedReports';
import SubscriptionReports from './SubscriptionReports';

const Reports = () => {
  const [value, setValue] = React.useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            variant='fullWidth'
            value={value}
            onChange={handleTabChange}
            aria-label='basic tabs example'
          >
            <Tab label='Saved Reports' />
            <Tab label='Subscription Reports' />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <SavedReports />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SubscriptionReports />
        </TabPanel>
      </Box>
    </div>
  );
};

export default Reports;
