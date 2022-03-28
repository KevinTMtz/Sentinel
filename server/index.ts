import cors from 'cors';
import express from 'express';
import path from 'path';

import tweetsRouter from './routers/tweets';
import { SERVER } from './config/config';

const app = express();
const port = SERVER.port;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.static('../client/build'));

// Tweets router
app.use('/tweets', tweetsRouter);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
