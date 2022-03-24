import express, { Request, Response } from 'express';
import path from 'path';
import cors from 'cors';

import tweetsRouter from './routers/tweets';
import SERVER from './config/config';

const app = express();
const port = SERVER.port;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Tweets router
app.use('/tweets', tweetsRouter);

// Serve static assets if in production
if (SERVER.env === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
