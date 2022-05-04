import React, { useState } from 'react';
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore/lite';
import { Button, Grid, Typography } from '@mui/material';

import { firestore } from '../../config/firebase';
import ReportChart from './ReportChart';
import Map, { MapProps } from './Map';

interface ReportProps {
  // TODO: Change report type to object containing chart types (these should be defined and exported on each chart)
  report: any;
}

const Report = (props: ReportProps) => {
  // TODO: Delete this, only to test delete function
  const [reportId, setReportId] = useState<string>('');

  const saveReport = async () => {
    await addDoc(collection(firestore, 'reports'), {
      // TODO: Get id and add to new collection inside the path /reports/userID/reportID
      ...props.report,
    }).then(
      (res) => {
        console.log('Uploaded report');
        setReportId(res.id);
      },
      (error) => console.log('Error uploading report'),
    );
  };

  const deleteReport = async () => {
    await deleteDoc(doc(firestore, 'reports', `${reportId}`)).then(
      (res) => {
        console.log('Deleted report');
        setReportId('');
      },
      (error) => console.log('Error deleting report'),
    );
  };

  // TODO: Delete example
  const mapProps: MapProps = {
    type: 'Heat',
    title: 'Count per state',
    data: { states: [{ id: 'son', count: 97 }], max: 100 },
  };

  return (
    <Grid>
      <Map {...mapProps} />
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
            <Button variant='contained' onClick={deleteReport}>
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
