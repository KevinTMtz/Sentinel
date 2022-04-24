import { Request, Response, Router } from 'express';
import { query, validationResult } from 'express-validator';
import Twitter from 'twitter';
import Sentiment from 'sentiment';

import { TWITTER } from '../config/config';
import getReport from '../functions/getReport';

const sentiment = new Sentiment();
const router = Router();

var twitterClient = new Twitter(TWITTER);

// TODO: Either find a way to send data in a GET, use params instead or leave it as POST
router.get(
  '/search',
  query('topic').isString(),
  query('until').isISO8601().toDate(),
  async (req: Request, res: Response) => {
    if (!validationResult(req).isEmpty()) {
      return res.status(400).json({ msg: 'Invalid request data' });
    }

    const { topic, until, location } = req.query;

    twitterClient
      .get('search/tweets', {
        q: topic,
        until,
        result_type: 'mixed',
        count: 10,
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
        return res.status(200).json({
          report: getReport(tweets),
        });
      })
      .catch((err) => {
        return res.status(500).json({ message: err.message, err });
      });
  },
);

export default router;
