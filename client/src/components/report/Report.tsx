import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore/lite';
import { Button } from '@mui/material';

import { firestore } from '../../config/firebase';

const Report = () => {
  const [report, setReport] = useState<any>();
  // TODO: Delete this, only to test delete function
  const [reportId, setReportId] = useState<string>('');

  const getReport = async () => {
    // TODO: Get req body from search component
    const data = {
      topic: 'marvel',
      until: new Date().toISOString(),
    };

    axios('/reports/search', {
      method: 'POST',
      responseType: 'json',
      data,
    }).then(
      (res: any) => {
        setReport(res.data.report);
      },
      (err: any) => {
        console.log(err);
      },
    );
  };

  const saveReport = async () => {
    await addDoc(collection(firestore, 'reports'), {
      // TODO: Get id and add to new collection inside the path /reports/userID/reportID
      ...report,
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

  useEffect(() => {
    getReport();
  }, []);

  return (
    <div>
      {/* TODO: Build UI components for report */}
      <h1>Report: </h1>
      {
        /* TODO: Substitute this with the charts components */
        report && (
          <>
            <p>Report created</p>
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
