import React from 'react';
import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';

import ReportChart from './ReportChart';
import {
  getDateAndTime,
  upperCaseFirstLetter,
} from '../../functions/utils/utils';
import Map from './Map';
import TweetList from './tweets/TweetList';
import { objectWithKeyStr } from '../../types/types';

interface ReportProps {
  report: any;
}

interface reportSection extends objectWithKeyStr {
  title: string;
  elements?: {
    charts?: string[];
    maps?: string[];
  };
}

interface reportSections extends objectWithKeyStr {
  sentiment: reportSection;
  statistics: reportSection;
  tweets: reportSection;
}

const Report = (props: ReportProps) => {
  const reportContent: reportSections = {
    sentiment: {
      title: 'Sentiment analysis',
      elements: {
        charts: ['generalSentiment', 'accumulatedSentiment'],
        maps: ['totalTweets'],
      },
    },
    statistics: {
      title: 'Statistics',
      elements: {
        maps: ['averageSentiment'],
      },
    },
    tweets: { title: 'Tweets sample' },
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
      <Typography variant='h4'>
        <strong>
          {upperCaseFirstLetter(props.report.query.topic)}
          's report:
        </strong>
      </Typography>
      <Typography variant='h6'>
        Created at: {getDateAndTime(props.report.query.created_at)}
      </Typography>
      <Typography variant='h6'>
        {props.report.statistics.total} tweets found
      </Typography>

      {Object.keys(reportContent).map((section: string) => {
        const sectionElements = (
          section === 'tweets'
            ? props.report[section] && [
                <TweetList tweets={props.report[section]} key={section} />,
              ]
            : Object.keys(reportContent[section].elements).map(
                (elementType: string) =>
                  reportContent[section].elements[elementType].reduce(
                    (
                      resultArr: (JSX.Element | undefined)[],
                      elementName: string,
                    ) => {
                      if (
                        props.report.hasOwnProperty(elementType) &&
                        props.report[elementType].hasOwnProperty(elementName)
                      )
                        resultArr.push(
                          getElement(
                            elementType,
                            elementName,
                            props.report[elementType][elementName],
                          ),
                        );

                      return resultArr;
                    },
                    [],
                  ),
              )
        )?.flat(1);

        if (sectionElements !== undefined && sectionElements.length > 0)
          return (
            <Box key={`section-${section}`}>
              <Typography variant='h5' sx={{ margin: '16px 0 8px 0' }}>
                <strong>{reportContent[section].title}</strong>
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  width: '100%',
                }}
              >
                {sectionElements}
              </Box>
            </Box>
          );
        else return undefined;
      })}
    </Grid>
  );
};

export default Report;
