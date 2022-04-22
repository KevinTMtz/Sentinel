import { Request, Response, Router } from 'express';
import Twitter, { ResponseData } from 'twitter';
import Sentiment from 'sentiment';

import { TWITTER } from '../config/config';

const sentiment = new Sentiment();
const router = Router();

var twitterClient = new Twitter(TWITTER);

router.get('/search', async (req: Request, res: Response) => {
  twitterClient
    .get('search/tweets', {
      q: req.query.keyword,
      count: 2,
    })
    .then((data) => {
      const tweets = data.statuses.map((tweet: ResponseData) => ({
        // TODO: Check which properties to include in the object for the reports
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
