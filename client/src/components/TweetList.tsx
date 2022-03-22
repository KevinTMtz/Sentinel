import React, { useEffect, useState } from 'react';
import Sentiment from 'sentiment';
import axios from 'axios';
import dotenv from 'dotenv';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore/lite';

import TweetRow from './TweetRow';

dotenv.config({ path: '../../.env' });

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY as string,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN as string,
  projectId: process.env.REACT_APP_PROJECT_ID as string,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET as string,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID as string,
  appId: process.env.REACT_APP_APP_ID as string,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const TweetList = () => {
  const sentiment = new Sentiment();

  const [tweets, setTweets] = useState<any>();

  const getTweets = async () => {
    axios('/tweets/search', {
      method: 'GET',
      responseType: 'json',
      baseURL: 'http://localhost:3001',
    }).then(
      (res: any) => {
        setTweets(res.data.statuses);

        res.data.statuses.forEach(async (tweet: any) => {
          await setDoc(doc(db, 'tweets', `${tweet.id}`), {
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
            sentiment={sentiment.analyze(tweet.text).score}
            key={tweet.id}
          />
        ))}
    </div>
  );
};

export default TweetList;
