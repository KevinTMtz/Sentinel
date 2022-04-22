import React from 'react';

import TweetRow from './TweetRow';

interface TweetListProps {
  tweets: any;
}

const TweetList = (props: TweetListProps) => {
  return (
    <div>
      <h3>Tweet List</h3>
      {props.tweets &&
        props.tweets.map((tweet: any) => (
          <TweetRow
            text={tweet.text}
            sentiment={tweet.sentiment}
            key={tweet.id}
          />
        ))}
    </div>
  );
};

export default TweetList;
