import { Request, Response, Router } from 'express';
import { query, validationResult } from 'express-validator';
import Twitter from 'twitter';
import Sentiment from 'sentiment';

import { TWITTER } from '../config/config';
import getReport from '../functions/getReport';

const sentiment = new Sentiment();
const router = Router();

var twitterClient = new Twitter(TWITTER);

const stateLocations = {
  AG: { Lat: 21.88082527827148, Long: -102.29490413444579 },
  BC: { Lat: 30.02677576706835, Long: -115.02786308404241 },
  BS: { Lat: 25.07114166920069, Long: -111.57391039092163 },
  CM: { Lat: 19.837985929887306, Long: -90.52559317873929 },
  CS: { Lat: 16.627447999812468, Long: -92.48889904138234 },
  CH: { Lat: 28.836189845908322, Long: -106.17122373685477 },
  CX: { Lat: 19.36606563483218, Long: -99.12714243850714 },
  CO: { Lat: 27.125011895293966, Long: -102.12376275818683 },
  CL: { Lat: 19.23890985229545, Long: -103.72002520806888 },
  DG: { Lat: 24.018605703988403, Long: -104.65116026084536 },
  GT: { Lat: 21.018697457193365, Long: -101.25796612323231 },
  GR: { Lat: 17.652059013890113, Long: -99.8788848407731 },
  HG: { Lat: 20.458518414010467, Long: -98.95033041599295 },
  JC: { Lat: 20.360655124875077, Long: -103.91328038351027 },
  EM: { Lat: 19.49912979578888, Long: -99.86379421315354 },
  MI: { Lat: 19.301747999864254, Long: -102.04403993743517 },
  MO: { Lat: 18.739632164519012, Long: -99.05547826782258 },
  NA: { Lat: 21.794175859555452, Long: -104.8533693106741 },
  NL: { Lat: 25.612542205141793, Long: -99.60793921497992 },
  OA: { Lat: 16.762217408508867, Long: -96.56444038165603 },
  PU: { Lat: 18.755087846248724, Long: -97.81582765600449 },
  QT: { Lat: 20.623258979832816, Long: -100.02869917723521 },
  QR: { Lat: 19.492717738779053, Long: -88.02609027059728 },
  SL: { Lat: 22.577005619284336, Long: -100.37953778051383 },
  SI: { Lat: 24.59824160903224, Long: -107.21375650518878 },
  SO: { Lat: 29.587066810818722, Long: -110.86207556795719 },
  TB: { Lat: 18.10967628823872, Long: -92.7901793566567 },
  TM: { Lat: 23.825502723230713, Long: -98.60317419989737 },
  TL: { Lat: 19.405011084837437, Long: -98.17461422519776 },
  VE: { Lat: 19.10663202101542, Long: -96.45508700729867 },
  YU: { Lat: 20.6879361077897, Long: -89.05349829383984 },
  ZA: { Lat: 23.36733542534477, Long: -102.95503504088775 },
};

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
        count: 100,
        lang: 'es',
        // geocode: '23.62538105,-102.27326622460241,800km',
      })
      .then((data) => {
        const tweets = data.statuses.map(
          ({
            text,
            created_at,
          }: // place,
          {
            text: string;
            created_at: string;
            // place: { string: [string] };
          }) => {
            return {
              text,
              sentiment: sentiment.analyze(text).score,
              created_at,
              // place,
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
            ...getReport(tweets),
          },
        });
      })
      .catch((err) => {
        return res.status(500).json({ message: err.message, err });
      });
  },
);

export default router;
