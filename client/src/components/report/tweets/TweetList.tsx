import React from 'react';
import { Box } from '@mui/material';

import TweetRow from './TweetRow';

interface TweetListProps {
  tweets: any;
}

const TweetList = (props: TweetListProps) => (
  <Box sx={{ width: '100%' }}>
    {props.tweets &&
      props.tweets.map((tweet: any, index: number) => (
        <TweetRow
          key={`tweet-row-${tweet.id}-${index}`}
          text={tweet.text}
          sentiment={tweet.sentiment}
        />
      ))}
  </Box>
);

export default TweetList;
