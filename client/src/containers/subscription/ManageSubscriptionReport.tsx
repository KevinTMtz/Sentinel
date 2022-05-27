import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { User } from 'firebase/auth';
import { Box } from '@mui/system';
import { Button } from '@mui/material';

import Report from '../../components/report/Report';
import { firebaseAuth } from '../../config/firebase';
import { styles } from '../../styles/styles';
import { getSubscriptionReport } from '../../functions/firestore/subscription';

const ManageSubscriptionReport = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentUser, setCurrentUser] = useState<User | null>();

  const [report, setReport] = useState<any>();

  firebaseAuth.onAuthStateChanged((user) => setCurrentUser(user));

  const locationState = location.state as {
    subscriptionId: string;
    reportId: string;
  };

  const subscriptionId = locationState.subscriptionId;
  const reportId = locationState.reportId;

  useEffect(() => {
    if (currentUser?.uid && subscriptionId && reportId)
      getSubscriptionReport(currentUser.uid, subscriptionId, reportId).then(
        (doc) => {
          setReport(doc.data());
        },
        (error) => console.log(error.message),
      );
  }, [currentUser?.uid, subscriptionId, reportId]);

  const navigateBack = () => {
    navigate(-1);
  };

  return (
    <Box>
      <Box sx={{ marginBottom: '16px', ...styles.displayRowsButtons }}>
        <Button
          variant='outlined'
          color='primary'
          fullWidth
          onClick={navigateBack}
        >
          Go back
        </Button>
      </Box>
      {report && <Report report={report} />}
    </Box>
  );
};

export default ManageSubscriptionReport;
