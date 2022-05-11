import React, { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { Box } from '@mui/material';

import { firebaseAuth } from '../../config/firebase';
import { getReports } from '../../functions/firestore/reports';
import ReportRow from '../../components/report/ReportRow';
import { styles } from '../../styles/styles';

const SavedReports = () => {
  const [currentUser, setCurrentUser] = useState<User | null>();

  const [reports, setReports] = useState<any[]>([]);

  firebaseAuth.onAuthStateChanged((user) => setCurrentUser(user));

  useEffect(() => {
    if (currentUser?.uid)
      getReports(currentUser?.uid).then(
        (querySnapshot) => {
          const tempReports: any[] = [];

          querySnapshot.forEach((report: any) =>
            tempReports.push(report.data()),
          );

          setReports(tempReports);
        },
        (error) => console.log(error.message),
      );
  }, [currentUser?.uid]);

  return (
    <Box sx={{ ...styles.displayRowsButtons, marginTop: '16px' }}>
      {reports.map((report, index) => (
        <ReportRow
          key={`report-${index}`}
          report={report.query}
          createdAt={report.query.created_at}
        />
      ))}
    </Box>
  );
};

export default SavedReports;
