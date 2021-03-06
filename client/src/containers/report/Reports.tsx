import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'firebase/auth';
import { Box, Typography } from '@mui/material';

import ReportRow from '../../components/report/ReportRow';
import { firebaseAuth } from '../../config/firebase';
import { DocumentData } from 'firebase/firestore/lite';
import { getReports } from '../../functions/firestore/reports';
import { styles } from '../../styles/styles';
import Title from '../../components/ui/Title';

const Reports = () => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState<User | null>();

  const [reports, setReports] = useState<any[]>([]);

  firebaseAuth.onAuthStateChanged((user) => setCurrentUser(user));

  useEffect(() => {
    if (currentUser?.uid)
      getReports(currentUser.uid).then(
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
        (error) => console.log(error.message),
      );
  }, [currentUser?.uid]);

  return (
    <Box sx={{ ...styles.displayRowsButtons, marginTop: '16px' }}>
      <Title>Saved reports</Title>
      {reports.length === 0 ? (
        <Typography variant='h6' textAlign='center' sx={{ marginTop: '32px' }}>
          You do not have any saved reports
        </Typography>
      ) : (
        reports.map((report, index) => (
          <ReportRow
            key={`report-${index}`}
            report={report.query}
            createdAt={report.query.created_at}
            onClick={() =>
              navigate(report.id, { state: { reportId: report.id } })
            }
          />
        ))
      )}
    </Box>
  );
};

export default Reports;
