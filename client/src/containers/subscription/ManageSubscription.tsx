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
  deleteSubscriptionReport,
  getSubscription,
  getSubscriptionReports,
  updateSubscription,
} from '../../functions/firestore/subscription';
import Title from '../../components/ui/Title';
import SubscribeBar from '../../components/search/SubscribeBar';
import {
  ReportSearchQuery,
  Subscription,
  SubscriptionConfig,
} from '../../types/types';
import { upperCaseFirstLetter } from '../../functions/utils/utils';

const ManageSubscription = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentUser, setCurrentUser] = useState<User | null>();

  const [query, setQuery] = useState<ReportSearchQuery>();
  const [subConfig, setSubConfig] = useState<SubscriptionConfig>();
  const [stateSubConfig, setStateSubConfig] = useState<SubscriptionConfig>();

  const [reports, setReports] = useState<any[]>([]);

  firebaseAuth.onAuthStateChanged((user) => setCurrentUser(user));

  const subscriptionId = (location.state as { subscriptionId: string })
    .subscriptionId;

  useEffect(() => {
    if (currentUser?.uid) {
      getSubscription(currentUser.uid, subscriptionId).then(
        (doc) => {
          const docData = doc.data();

          setQuery(docData.query);

          const newSubConfig = {
            ...docData.config,
            startDate: docData.config.startDate.toDate(),
          };

          setSubConfig(newSubConfig);
          setStateSubConfig(newSubConfig);
        },
        (err) => console.log(err.message),
      );

      getSubscriptionReports(currentUser.uid, subscriptionId).then(
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
    const newSubConfig = {
      ...stateSubConfig,
      isActive: !stateSubConfig?.isActive,
    } as SubscriptionConfig;

    setStateSubConfig(newSubConfig);

    await updateSubscriptionConfig(newSubConfig);
  };

  const updateSubscriptionConfig = async (config?: SubscriptionConfig) => {
    const newSubscription = {
      query: query,
      config: config ?? subConfig,
    } as Subscription;

    if (currentUser?.uid)
      await updateSubscription(
        currentUser.uid,
        subscriptionId,
        newSubscription,
      ).then(
        (_) => {
          if (config)
            setSubConfig({
              ...subConfig,
              isActive: config.isActive,
            } as SubscriptionConfig);
          else setStateSubConfig(newSubscription.config);

          console.log('Updated subscription');
        },
        (err) => console.log(err.message),
      );
  };

  const deleteSubscriptionAndReports = async () => {
    if (currentUser?.uid)
      await deleteSubscription(currentUser.uid, subscriptionId).then(
        async (_) => {
          reports.forEach(async (report) => {
            await deleteSubscriptionReport(
              currentUser.uid,
              subscriptionId,
              report.id,
            ).then(
              (_) => {
                console.log('Deleted report');
              },
              (err) => console.log(err.message),
            );
          });

          navigateBack();
        },
        (err) => console.log(err.message),
      );
  };

  const navigateBack = () => {
    navigate(-1);
  };

  return (
    <Box sx={{ ...styles.displayRowsButtons, marginTop: '16px' }}>
      <Title>Subscription - {upperCaseFirstLetter(query?.topic ?? '')}</Title>
      {subConfig && (
        <SubscribeBar
          subscribe={updateSubscriptionConfig}
          subConfig={subConfig}
          setSubConfig={setSubConfig}
          buttonText='Update'
        />
      )}
      <Box sx={{ marginBottom: '16px', ...styles.displayRowsButtons }}>
        {stateSubConfig?.isActive ? (
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
          onClick={() => navigateBack()}
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
