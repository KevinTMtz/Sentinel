import React, { useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { User } from 'firebase/auth';

import ReportChart from './ReportChart';
import { firebaseAuth } from '../../config/firebase';
import { createReport, deleteReport } from '../../functions/firestore/reports';

interface ReportProps {
  // TODO: Change report type to object containing chart types (these should be defined and exported on each chart)
  report: any;
}

const Report = (props: ReportProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>();

  firebaseAuth.onAuthStateChanged((user) => setCurrentUser(user));

  // TODO: Delete this, only to test delete function
  const [reportId, setReportId] = useState<string>('');

  const saveReport = async () => {
    if (currentUser?.uid)
      await createReport(currentUser?.uid, props.report).then(
        (res) => {
          console.log('Uploaded report');
          setReportId(res.id);
        },
        (error) => console.log('Error uploading report'),
      );
  };

  const unsaveReport = async () => {
    if (currentUser?.uid)
      await deleteReport(reportId, currentUser?.uid).then(
        (res) => {
          console.log('Deleted report');
          setReportId('');
        },
        (error) => console.log('Error deleting report'),
      );
  };

  return (
    <Grid>
      {props.report && (
        <>
          <Typography variant='h3' textAlign='center'>
            {props.report.query.topic.toUpperCase()}'s report:
          </Typography>
          <Typography variant='h6' textAlign='center'>
            Created at: {props.report.query.created_at.split('T')[0]}
          </Typography>
          <Typography variant='h6' textAlign='center'>
            {props.report.statistics.total} tweets found
          </Typography>
          {/* TODO: Add a map function to display al charts */}
          <ReportChart {...props.report.charts.generalSentiment} />
          <ReportChart {...props.report.charts.accumulatedSentiment} />
          {reportId !== '' ? (
            <Button variant='contained' onClick={unsaveReport}>
              Delete Report
            </Button>
          ) : (
            <Button variant='contained' onClick={saveReport}>
              Save Report
            </Button>
          )}
        </>
      )}
    </Grid>
  );
};

export default Report;
