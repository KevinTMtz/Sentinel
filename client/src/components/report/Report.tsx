import React from 'react';
import { Grid, Typography } from '@mui/material';

import ReportChart from './ReportChart';
import {
  getDateAndTime,
  upperCaseFirstLetter,
} from '../../functions/utils/utils';
import Map from './Map';
import { objectWithKeyStr } from '../../types/types';

interface ReportProps {
  report: any;
}

interface reportSection extends objectWithKeyStr {
  charts: string[];
  maps: string[];
}

interface reportSections extends objectWithKeyStr {
  sentiment: reportSection;
  statistics: reportSection;
}

const Report = (props: ReportProps) => {
  const reportContent: reportSections = {
    sentiment: {
      charts: ['generalSentiment', 'accumulatedSentiment'],
      maps: ['totalTweets'],
    },
    statistics: { charts: [], maps: ['averageSentiment'] },
  };

  const getElement = (elementType: string, key: string, elementProps: any) => {
    switch (elementType) {
      case 'charts':
        return <ReportChart {...elementProps} key={key} />;

      case 'maps':
        return <Map {...elementProps} key={key} />;
    }
  };

  return (
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

      {Object.keys(reportContent).map((section: string) =>
        Object.keys(reportContent[section]).map((elementType: string) =>
          reportContent[section][elementType].map((elementName: string) =>
            props.report.hasOwnProperty(elementType) &&
            props.report[elementType].hasOwnProperty(elementName)
              ? getElement(
                  elementType,
                  elementName,
                  props.report[elementType][elementName],
                )
              : null,
          ),
        ),
      )}
    </Grid>
  );
};

export default Report;
