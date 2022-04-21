import dotenv from 'dotenv';
import { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';
import Twitter, { ResponseData } from 'twitter';
import Sentiment from 'sentiment';

import { TWITTER } from '../config/config';

const sentiment = new Sentiment();
const router = Router();

var twitterClient = new Twitter(TWITTER);

router.get(
  '/search',
  body('since').isISO8601().toDate(),
  body('topic').isString(),
  body('until').isISO8601().toDate(),
  async (req: Request, res: Response) => {
    if (!validationResult(req).isEmpty()) {
      return res.status(400).json({ msg: 'Invalid request data' });
    }

    const { since, topic, until } = req.body;

    twitterClient
      .get('search/tweets', {
        q: topic,
        // TODO:
        since,
        until,
        result_type: 'mixed',
        count: 100,
        lang: 'es',
        // TODO: Check how to limit to only mexico by user location
        // geocode: '23.62538105,-102.27326622460241,800km',
      })
      .then((data) => {
        const tweets = data.statuses.map(
          ({
            text,
            created_at,
            lang,
          }: // place,
          {
            text: string;
            created_at: string;
            lang: string;
            // place: { string: [string] };
          }) => {
            return {
              text,
              sentiment: sentiment.analyze(text).score,
              lang,
              created_at,
              // place,
            };
          },
        );
        return res.status(200).json({ length: tweets.length, tweets });
      })
      .catch((err) => {
        return res.status(500).json({ message: err.message, err });
      });
  },
);

export default router;
