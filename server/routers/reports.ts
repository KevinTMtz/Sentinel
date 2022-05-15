import { Request, Response, Router } from 'express';
import { query, validationResult } from 'express-validator';
import Twitter from 'twitter';
import Sentiment from 'sentiment';

import { TWITTER } from '../config/config';
import { getReport } from '../functions/getReport';
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

    const states =
      location === 'all' ? Object.keys(statesGeocodes) : [location];

    const tweets = [];

    for (var state of states) {
      tweets.push({
        [state as string]: await getTweets(
          topic,
          until,
          statesGeocodes[state as string],
        ),
      });
    }

    return res.status(200).json({
      report: {
        query: {
          topic,
          location,
          until,
          created_at: new Date().toISOString(),
        },
        ...(await getReport(tweets)),
        trends: await getTrends(),
      },
    });
  },
);

const getTweets = async (q: any, until: any, state: any) => {
  const data = await twitterClient.get('search/tweets', {
    q,
    until,
    result_type: 'recent',
    count: 100,
    lang: 'es',
    geocode: `${state.lat},${state.long},${state.radius}km`,
  });

  const tweets = data.statuses.map(
    ({ text, created_at }: { text: string; created_at: string }) => ({
      text,
      sentiment: sentiment.analyze(text).score,
      created_at,
    }),
  );

  return tweets;
};

const getTrends = async () => {
  const data = await twitterClient.get('trends/place', {
    id: 23424900,
  });

  const trendsData = data
    .map((trend: any) =>
      trend.trends.map((trend: any) => ({
        name: trend.name,
        tweetVolume: trend.tweet_volume,
      })),
    )
    .flat(1)
    .sort((a: any, b: any) => (a.tweetVolume < b.tweetVolume ? 1 : -1))
    .slice(0, 10);

  return trendsData;
};

export default router;
