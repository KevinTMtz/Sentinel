import { Request, Response, Router } from 'express';
import { query, validationResult } from 'express-validator';
import Twitter from 'twitter';
import TwitterV2 from 'twitter-v2';
import Sentiment from 'sentiment';

import { TWITTER } from '../config/config';
import { getReport } from '../functions/getReport';
import { statesGeocodes } from '../values/states';

const sentiment = new Sentiment();
const router = Router();

var twitterClient = new Twitter(TWITTER);
var twitterClientV2 = new TwitterV2({
  consumer_key: TWITTER.consumer_key,
  consumer_secret: TWITTER.consumer_secret,
});

router.get(
  '/search',
  query('topic').isString(),
  query('until').isISO8601().toDate(),
  query('location').isString().isLength({ min: 3 }),
  async (req: Request, res: Response) => {
    if (!validationResult(req).isEmpty()) {
      return res.status(400).json({ msg: 'Invalid request data' });
    }

    const { topic, until, location } = req.query;

    const states = (
      location === 'all' ? Object.keys(statesGeocodes) : [location]
    ) as string[];

    const allTweets: any[] = [];
    const tweetsByState: any[] = [];

    const promises = states.map((state) => {
      return getTweets(topic, until, state);
    });

    (await Promise.all(promises)).map((result) => {
      const [stateAbv, tweets] = result;

      tweetsByState.push({
        [stateAbv]: tweets,
      });

      allTweets.push(...tweets);
    });

    const tweetCount = await getTweetCount(topic, until);

    return res.status(200).json({
      report: {
        query: {
          topic,
          location,
          until,
          created_at: new Date().toISOString(),
        },
        ...(await getReport(allTweets, tweetsByState, tweetCount)),
        trends: await getTrends(),
      },
    });
  },
);

const getTweets = async (q: any, until: any, stateAbv: string) => {
  const state = statesGeocodes[stateAbv as string];
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

  return [stateAbv, tweets];
};

const getTweetCount = async (q: any, until: any) => {
  const data = await twitterClientV2.get('tweets/counts/recent', {
    query: q,
    start_time: until,
    end_time: until,
    granularity: 'day',
  });

  return data as any[];
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
