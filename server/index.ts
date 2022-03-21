import express, { Request, Response } from 'express';
import cors from 'cors';

import tweetsRouter from './routers/tweets';

const app = express();
const port = 3001;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Tweets router
app.use('/tweets', tweetsRouter);

app.get('/', (_: Request, res: Response) => {
  res.send('Server is running!');
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
