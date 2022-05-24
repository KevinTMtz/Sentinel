import { useState } from 'react';
import { User } from 'firebase/auth';
import { Box, Button } from '@mui/material';

import { firebaseAuth } from '../../config/firebase';
import { createReport, deleteReport } from '../../functions/firestore/reports';
import { ReportSearchQuery, SubscriptionConfig } from '../../types/types';
import SearchBar from '../../components/search/SearchBar';
import Report from '../../components/report/Report';
import Spinner from '../../components/utils/Spinner';
import { styles } from '../../styles/styles';
import SubscribeBar from '../../components/search/SubscribeBar';
import {
  createSubscription,
  deleteSubscription,
} from '../../functions/firestore/subscription';
import { searchAndGetReport } from '../../functions/search/search';

const emptyQuery: ReportSearchQuery = {
  topic: '',
  location: 'all',
  until: new Date(),
};

const emptySubConfig: SubscriptionConfig = {
  periodicy: 'weekly',
};

const Search = () => {
  const [currentUser, setCurrentUser] = useState<User | null>();

  const [query, setQuery] = useState<ReportSearchQuery>(emptyQuery);

  const [subConfig, setSubConfig] =
    useState<SubscriptionConfig>(emptySubConfig);

  const [report, setReport] = useState<any>(null);
  const [reportId, setReportId] = useState<string>('');

  const [subscriptionId, setSubscriptionId] = useState<string>('');

  const [isLoading, setLoading] = useState<boolean>(false);

  firebaseAuth.onAuthStateChanged((user) => setCurrentUser(user));

  const saveReport = async () => {
    if (currentUser?.uid)
      await createReport(currentUser?.uid, report).then(
        (res) => {
          console.log('Uploaded report');
          setReportId(res.id);
        },
        (err) => console.log(`Error: ${err.message}`),
      );
  };

  const unsaveReport = async () => {
    if (currentUser?.uid)
      await deleteReport(currentUser?.uid, reportId).then(
        (res) => {
          console.log('Deleted report');
          setReportId('');
        },
        (err) => console.log(`Error: ${err.message}`),
      );
  };

  const search = () => {
    setLoading(true);
    searchAndGetReport(query).then(
      (res: any) => {
        setReport(res.data.report);
        setLoading(false);
      },
      (err: any) => {
        console.log(err);
      },
    );
  };

  const subscribeSearch = async () => {
    if (currentUser?.uid)
      await createSubscription(currentUser?.uid, {
        query: query,
        config: subConfig,
      }).then(
        (res) => {
          setSubscriptionId(res.id);
        },
        (err) => {
          console.log(err);
        },
      );
  };

  const unSubscribeSearch = async () => {
    if (currentUser?.uid)
      await deleteSubscription(currentUser?.uid, subscriptionId).then(
        (res) => {
          setSubscriptionId('');
        },
        (err) => {
          console.log(err);
        },
      );
  };

  const clearState = () => {
    setQuery(emptyQuery);
    setSubConfig(emptySubConfig);
    setReport(null);
    setReportId('');
  };

  return (
    <div>
      {report ? (
        <>
          <Box sx={{ margin: '16px 0px', ...styles.displayRowsButtons }}>
            {subscriptionId ? (
              <Button
                variant='contained'
                color='secondary'
                fullWidth
                onClick={unSubscribeSearch}
              >
                Unsubscribe
              </Button>
            ) : (
              <SubscribeBar
                subscribe={subscribeSearch}
                subConfig={subConfig}
                setSubConfig={setSubConfig}
              />
            )}

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
            <Button variant='outlined' fullWidth onClick={clearState}>
              Search again
            </Button>
          </Box>
          <Report report={report} />
        </>
      ) : (
        <>
          <SearchBar query={query} setQuery={setQuery} search={search} />
          {isLoading && <Spinner />}
        </>
      )}
    </div>
  );
};

export default Search;
