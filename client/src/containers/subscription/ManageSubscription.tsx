import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { User } from 'firebase/auth';
import { Box, Button, Typography } from '@mui/material';

import ReportRow from '../../components/report/ReportRow';
import { firebaseAuth } from '../../config/firebase';
import { DocumentData } from 'firebase/firestore/lite';
import { styles } from '../../styles/styles';
import {
  deleteSubscription,
  getSubscription,
  getSubscriptionReports,
  updateSubscription,
} from '../../functions/firestore/subscription';
import Title from '../../components/ui/Title';
import SubscribeBar from '../../components/search/SubscribeBar';
import { Subscription, SubscriptionConfig } from '../../types/types';

const ManageSubscription = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentUser, setCurrentUser] = useState<User | null>();

  const [subscription, setSubscription] = useState<Subscription>();
  const [subConfig, setSubConfig] = useState<SubscriptionConfig>();

  const [reports, setReports] = useState<any[]>([]);

  firebaseAuth.onAuthStateChanged((user) => setCurrentUser(user));

  const subscriptionId = (location.state as { subscriptionId: string })
    .subscriptionId;

  useEffect(() => {
    if (currentUser?.uid) {
      getSubscription(currentUser?.uid, subscriptionId).then(
        (doc) => {
          const docData = doc.data();

          setSubscription(docData);
          setSubConfig({
            ...docData.config,
            startDate: docData.config.startDate.toDate(),
          });
        },
        (err) => console.log(err.message),
      );

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
    }
  }, [currentUser?.uid, subscriptionId]);

  const updateSubscriptionConfigState = async () => {
    const newConfig = {
      ...subConfig,
      isActive: !subConfig?.isActive,
    } as SubscriptionConfig;

    setSubConfig(newConfig);

    await updateSubscriptionConfig(newConfig);
  };

  const updateSubscriptionConfig = async (config?: SubscriptionConfig) => {
    if (currentUser?.uid && subConfig && subscription?.query)
      updateSubscription(currentUser?.uid, subscriptionId, {
        ...subscription,
        config: config ?? subConfig,
      }).then(
        (res) => console.log('Updated subscription'),
        (err) => console.log(err.message),
      );
  };

  const deleteSubscriptionAndReports = async () => {
    if (currentUser?.uid)
      deleteSubscription(currentUser?.uid, subscriptionId).then(
        (res) => {},
        (err) => console.log(err.message),
      );
  };

  return (
    <Box sx={{ ...styles.displayRowsButtons, marginTop: '16px' }}>
      <Title>Subscription - {subscription?.query.topic}</Title>
      {subConfig && (
        <SubscribeBar
          subscribe={updateSubscriptionConfig}
          subConfig={subConfig}
          setSubConfig={setSubConfig}
          buttonText='Update'
        />
      )}
      <Box sx={{ marginBottom: '16px', ...styles.displayRowsButtons }}>
        {subConfig?.isActive ? (
          <Button
            variant='contained'
            color='warning'
            fullWidth
            onClick={updateSubscriptionConfigState}
          >
            Deactivate subscription
          </Button>
        ) : (
          <Button
            variant='contained'
            color='success'
            fullWidth
            onClick={updateSubscriptionConfigState}
          >
            Activate subscription
          </Button>
        )}
        <Button
          variant='contained'
          color='error'
          fullWidth
          onClick={deleteSubscriptionAndReports}
        >
          Delete subscription and its reports
        </Button>
        <Button
          variant='outlined'
          color='primary'
          fullWidth
          onClick={() => navigate(-1)}
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
            onClick={() =>
              navigate(report.id, {
                state: { subscriptionId: subscriptionId, reportId: report.id },
              })
            }
          />
        ))
      )}
    </Box>
  );
};

export default ManageSubscription;
