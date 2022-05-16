import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { User } from 'firebase/auth';
import { Box } from '@mui/system';
import { Button } from '@mui/material';

import Report from '../../components/report/Report';
import { firebaseAuth } from '../../config/firebase';
import { deleteReport, getReport } from '../../functions/firestore/reports';
import { styles } from '../../styles/styles';

const ManageReport = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentUser, setCurrentUser] = useState<User | null>();

  const [report, setReport] = useState<any>();

  firebaseAuth.onAuthStateChanged((user) => setCurrentUser(user));

  const reportId = location.pathname.substring(
    location.pathname.lastIndexOf('/') + 1,
  );

  useEffect(() => {
    if (currentUser?.uid)
      getReport(currentUser?.uid, reportId).then(
        (doc) => {
          setReport(doc.data());
        },
        (error) => console.log(error.message),
      );
  }, [currentUser?.uid, reportId]);

  const navigateBack = () => {
    navigate('/search-reports');
  };

  const unsaveReport = async () => {
    if (currentUser?.uid)
      await deleteReport(currentUser?.uid, reportId).then(
        (res) => {
          console.log('Deleted report');
          navigateBack();
        },
        (error) => console.log(`Error: ${error.message}`),
      );
  };

  return (
    <Box>
      <Box sx={{ marginBottom: '16px', ...styles.displayRowsButtons }}>
        <Button
          variant='contained'
          color='error'
          fullWidth
          onClick={unsaveReport}
        >
          Delete report
        </Button>
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

export default ManageReport;
