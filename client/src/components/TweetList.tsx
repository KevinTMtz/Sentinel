import React, { useEffect, useState } from 'react';
import axios from 'axios';

import TweetRow from './TweetRow';

const TweetList = () => {
  const [tweets, setTweets] = useState<any>();

  const getTweets = async () => {
    axios('/tweets/search', {
      method: 'GET',
      responseType: 'json',
      baseURL: 'http://localhost:3001',
    }).then(
      (res: any) => {
        setTweets(res.data.statuses);
      },
      (err: any) => {
        console.log(err);
      },
    );
  };

  useEffect(() => {
    getTweets();
  }, []);

  return (
    <div>
      <h3>Tweet List</h3>
      {tweets &&
        tweets.map((tweet: any) => (
          <TweetRow text={tweet.text} key={tweet.id} />
        ))}
    </div>
  );
};

export default TweetList;
