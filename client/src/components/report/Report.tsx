import React, { useState } from 'react';
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore/lite';
import { Button } from '@mui/material';

import { firestore } from '../../config/firebase';
import ReportChart from './ReportChart';

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

  return (
    <div>
      {/* TODO: Build UI components for report */}
      <h1>Report: </h1>
      {
        /* TODO: Substitute this with the charts components */
        props.report && (
          <>
            <p>Report created</p>
            <ReportChart {...props.report.generalSentiment} />
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
        )
      }
    </div>
  );
};

export default Report;
