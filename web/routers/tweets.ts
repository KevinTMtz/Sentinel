import { Request, Response, Router } from 'express';
import Twitter from 'twitter';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

const twitter = {
  consumer_key: process.env.TWITTER_APP_API_KEY as string,
  consumer_secret: process.env.TWITTER_APP_API_SECRET as string,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY as string,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET as string,
};

var twitterClient = new Twitter(twitter);

router.get('/search', async (req: Request, res: Response) => {
  twitterClient
    .get('search/tweets', {
      q: 'coding',
      count: 10,
    })
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message, err });
    });
});

export default router;
