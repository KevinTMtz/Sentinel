import { useState } from 'react';
import { User } from 'firebase/auth';
import { Box, Button } from '@mui/material';

import SearchBar from '../../components/SearchBar';
import Report from '../../components/report/Report';
import { firebaseAuth } from '../../config/firebase';
import { createReport, deleteReport } from '../../functions/firestore/reports';
import { styles } from '../../styles/styles';

const Search = () => {
  const [currentUser, setCurrentUser] = useState<User | null>();

  const [report, setReport] = useState<any>();
  const [reportId, setReportId] = useState<string>('');

  firebaseAuth.onAuthStateChanged((user) => setCurrentUser(user));

  const saveReport = async () => {
    if (currentUser?.uid)
      await createReport(currentUser?.uid, report).then(
        (res) => {
          console.log('Uploaded report');
          setReportId(res.id);
        },
        (error) => console.log(`Error: ${error.message}`),
      );
  };

  const unsaveReport = async () => {
    if (currentUser?.uid)
      await deleteReport(currentUser?.uid, reportId).then(
        (res) => {
          console.log('Deleted report');
          setReportId('');
        },
        (error) => console.log(`Error: ${error.message}`),
      );
  };

  return (
    <div>
      <SearchBar setReport={setReport} />
      {report && (
        <>
          <Box sx={{ margin: '16px 0px', ...styles.displayRowsButtons }}>
            {reportId !== '' ? (
              <Button
                variant='contained'
                color='error'
                fullWidth
                onClick={unsaveReport}
              >
                Delete Report
              </Button>
            ) : (
              <Button variant='contained' fullWidth onClick={saveReport}>
                Save Report
              </Button>
            )}
          </Box>
          <Report report={report} />
        </>
      )}
    </div>
  );
};

export default Search;
