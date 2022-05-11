import React from 'react';
import { Grid, Typography } from '@mui/material';

import ReportChart from './ReportChart';
import {
  getDateAndTime,
  upperCaseFirstLetter,
} from '../../functions/utils/utils';

interface ReportProps {
  report: any;
}

const Report = (props: ReportProps) => (
  <Grid>
    <Typography variant='h4' textAlign='center'>
      {upperCaseFirstLetter(props.report.query.topic)}
      's report:
    </Typography>
    <Typography variant='h6' textAlign='center'>
      Created at: {getDateAndTime(props.report.query.created_at)}
    </Typography>
    <Typography variant='h6' textAlign='center'>
      {props.report.statistics.total} tweets found
    </Typography>
    <ReportChart {...props.report.charts.generalSentiment} />
    <ReportChart {...props.report.charts.accumulatedSentiment} />
  </Grid>
);

export default Report;
