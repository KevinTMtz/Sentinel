import React from 'react';

const rowStyle = {
  border: '1px solid black',
  padding: '8px 16px',
  margin: '16px 0px',
  borderRadius: '8px',
};

interface TweetProps {
  text: String;
}

const TweetRow = (props: TweetProps) => {
  return (
    <div style={rowStyle}>
      <p>{props.text}</p>
      <p style={{ fontWeight: 'bold' }}>Sentiment: {'Positive'}</p>
    </div>
  );
};

export default TweetRow;
