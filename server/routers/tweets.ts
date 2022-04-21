import { Request, Response, Router } from 'express';
import Twitter, { ResponseData } from 'twitter';
import dotenv from 'dotenv';
import Sentiment from 'sentiment';

import { TWITTER } from '../config/config';

const sentiment = new Sentiment();
const router = Router();

var twitterClient = new Twitter(TWITTER);

router.get('/search', async (req: Request, res: Response) => {
  twitterClient
    .get('search/tweets', {
      q: 'coding',
      count: 2,
    })
    .then((data) => {
      const tweets = data.statuses.map((tweet: ResponseData) => ({
        ...tweet,
        sentiment: sentiment.analyze(tweet.text).score,
      }));
      return res.status(200).json(tweets);
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message, err });
    });
});

export default router;
