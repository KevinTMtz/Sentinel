import React from 'react';
import { Box, Typography } from '@mui/material';

const rowStyle = {
  padding: '8px',
  transition: 'all 0.2s ease-out',
  userSelect: 'none',
  border: '1px solid #3874CB',
  borderRadius: '4px',
  margin: '8px 0px',
};

interface TweetProps {
  text: string;
  sentiment: number;
}

const TweetRow = (props: TweetProps) => (
  <Box sx={rowStyle}>
    <Typography variant='subtitle1' textAlign='center'>
      {props.text}
    </Typography>
    <Typography variant='subtitle2' textAlign='center'>
      <strong>
        Sentiment:{' '}
        {props.sentiment === 0
          ? 'Neutral'
          : props.sentiment > 0
          ? 'Positive'
          : 'Negative'}
      </strong>
    </Typography>
  </Box>
);

export default TweetRow;
