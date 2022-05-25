import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'firebase/auth';
import { Box, Typography } from '@mui/material';

import { firebaseAuth } from '../../config/firebase';
import { styles } from '../../styles/styles';
import { getSubscriptions } from '../../functions/firestore/subscription';
import { Subscription } from '../../types/types';
import SubscriptionRow from '../../components/subscription/SubscriptionRow';
import { DocumentData } from 'firebase/firestore/lite';
import Title from '../../components/ui/Title';

const Subscriptions = () => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState<User | null>();

  const [reports, setReports] = useState<Subscription[]>([]);

  firebaseAuth.onAuthStateChanged((user) => setCurrentUser(user));

  useEffect(() => {
    if (currentUser?.uid)
      getSubscriptions(currentUser?.uid).then(
        (querySnapshot) => {
          const tempReports: any[] = [];

          querySnapshot.forEach((subscription: DocumentData) => {
            tempReports.push({ id: subscription.id, ...subscription.data() });
          });

          setReports(
            tempReports.sort((a, b) =>
              a.query.created_at < b.query.created_at ? 1 : -1,
            ),
          );
        },
        (error) => console.log(error.message),
      );
  }, [currentUser?.uid]);

  return (
    <Box sx={{ ...styles.displayRowsButtons, marginTop: '16px' }}>
      <Title>Subscriptions</Title>
      {reports.length === 0 ? (
        <Typography variant='h6' textAlign='center' sx={{ marginTop: '32px' }}>
          You do not have any subscriptions
        </Typography>
      ) : (
        reports.map((subscription, index) => (
          <SubscriptionRow
            key={`report-${index}`}
            subscription={subscription}
            onClick={() =>
              subscription.id &&
              navigate(subscription.id, {
                state: { subscriptionId: subscription.id },
              })
            }
          />
        ))
      )}
    </Box>
  );
};

export default Subscriptions;
