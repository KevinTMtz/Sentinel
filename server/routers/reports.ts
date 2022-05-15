import { Request, Response, Router } from 'express';
import { query, validationResult } from 'express-validator';
import Twitter from 'twitter';
import Sentiment from 'sentiment';

import { TWITTER } from '../config/config';
import getReport from '../functions/getReport';
import { statesGeocodes } from '../values/states';

const sentiment = new Sentiment();
const router = Router();

var twitterClient = new Twitter(TWITTER);

router.get(
  '/search',
  query('topic').isString(),
  query('until').isISO8601().toDate(),
  query('topic').isString().isLength({ min: 3 }),
  async (req: Request, res: Response) => {
    if (!validationResult(req).isEmpty()) {
      return res.status(400).json({ msg: 'Invalid request data' });
    }

    const { topic, until, location } = req.query;

    const loc = statesGeocodes[location as string];

    twitterClient
      .get('search/tweets', {
        q: topic,
        until,
        result_type: 'recent',
        count: 100,
        lang: 'es',
        geocode: `${loc.lat},${loc.long},${loc.radius}km`,
      })
      .then(async (data) => {
        const tweets = data.statuses.map(
          ({ text, created_at }: { text: string; created_at: string }) => {
            return {
              text,
              sentiment: sentiment.analyze(text).score,
              created_at,
            };
          },
        );

        return res.status(200).json({
          report: {
            query: {
              topic,
              location,
              until,
              created_at: new Date().toISOString(),
            },
            ...(await getReport(tweets)),
          },
        });
      })
      .catch((err) => {
        return res.status(500).json({ message: err.message, err });
      });
  },
);

export default router;
