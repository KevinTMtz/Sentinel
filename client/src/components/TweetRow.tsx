import React from 'react';

const rowStyle = {
  border: '1px solid black',
  padding: '8px 16px',
  margin: '16px 0px',
  borderRadius: '8px',
};

interface TweetProps {
  text: string;
  sentiment: number;
}

const TweetRow = (props: TweetProps) => {
  return (
    <div style={rowStyle}>
      <p>{props.text}</p>
      <p style={{ fontWeight: 'bold' }}>
        Sentiment:{' '}
        {props.sentiment === 0
          ? 'Neutral'
          : props.sentiment > 0
          ? 'Positive'
          : 'Negative'}
      </p>
    </div>
  );
};

export default TweetRow;
