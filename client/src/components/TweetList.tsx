import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore/lite';

import TweetRow from './TweetRow';
import { firestore } from '../config/firebase';

const TweetList = () => {
  const [tweets, setTweets] = useState<any>();

  const getTweets = async () => {
    axios('/tweets/search', {
      method: 'GET',
      responseType: 'json',
    }).then(
      (res: any) => {
        setTweets(res.data);
        res.data.forEach(async (tweet: any) => {
          await setDoc(doc(firestore, 'tweets', `${tweet.id}`), {
            ...tweet,
          }).then(
            (res) => console.log('Uploaded tweet'),
            (error) => console.log('Error uploading tweet'),
          );
        });
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
