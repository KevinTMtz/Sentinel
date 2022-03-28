import { Request, Response, Router } from 'express';
import Twitter from 'twitter';
import dotenv from 'dotenv';

import { TWITTER } from '../config/config';

const router = Router();

var twitterClient = new Twitter(TWITTER);

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
