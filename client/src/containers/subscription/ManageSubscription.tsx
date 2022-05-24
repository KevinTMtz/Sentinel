import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { User } from 'firebase/auth';
import { Box, Button, Typography } from '@mui/material';

import ReportRow from '../../components/report/ReportRow';
import { firebaseAuth } from '../../config/firebase';
import { DocumentData } from 'firebase/firestore/lite';
import { styles } from '../../styles/styles';
import { getSubscriptionReports } from '../../functions/firestore/subscription';
import Title from '../../components/ui/Title';

const ManageSubscription = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentUser, setCurrentUser] = useState<User | null>();

  const [reports, setReports] = useState<any[]>([]);

  firebaseAuth.onAuthStateChanged((user) => setCurrentUser(user));

  const subscriptionId = location.pathname.substring(
    location.pathname.lastIndexOf('/') + 1,
  );

  useEffect(() => {
    if (currentUser?.uid)
      getSubscriptionReports(currentUser?.uid, subscriptionId).then(
        (querySnapshot) => {
          const tempReports: any[] = [];

          querySnapshot.forEach((report: DocumentData) => {
            tempReports.push({ id: report.id, ...report.data() });
          });

          setReports(
            tempReports.sort((a, b) =>
              a.query.created_at < b.query.created_at ? 1 : -1,
            ),
          );
        },
        (err) => console.log(err.message),
      );
  }, [currentUser?.uid, subscriptionId]);

  return (
    <Box sx={{ ...styles.displayRowsButtons, marginTop: '16px' }}>
      <Title>Subscription</Title>
      <Box sx={{ marginBottom: '16px', ...styles.displayRowsButtons }}>
        <Button
          variant='outlined'
          color='primary'
          fullWidth
          onClick={() => navigate('/subscriptions')}
        >
          Go back
        </Button>
      </Box>
      {reports.length === 0 ? (
        <Typography variant='h6' textAlign='center' sx={{ marginTop: '32px' }}>
          This subscription does not have any reports
        </Typography>
      ) : (
        reports.map((report, index) => (
          <ReportRow
            key={`report-${index}`}
            report={report.query}
            createdAt={report.query.created_at}
            onClick={() => navigate(report.id)}
          />
        ))
      )}
    </Box>
  );
};

export default ManageSubscription;
