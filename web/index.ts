import express, { Request, Response } from 'express';
import path from 'path';
import cors from 'cors';

import tweetsRouter from './routers/tweets';

const app = express();
const port = 5000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Tweets router
app.use('/tweets', tweetsRouter);

app.get('/', (_: Request, res: Response) => {
  res.send('Server is running!');
});

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
