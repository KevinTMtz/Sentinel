import cors from 'cors';
import express from 'express';
import path from 'path';

import reportsRouter from './routers/reports';
import tweetsRouter from './routers/tweets';
import { SERVER } from './config/config';

const app = express();
const port = SERVER.port;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.static('../client/build'));

// Tweets router
app.use('/tweets', tweetsRouter);
// Reports router
app.use('/reports', reportsRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
