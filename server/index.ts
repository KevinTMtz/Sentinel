import cors from 'cors';
import express from 'express';
import path from 'path';

import reportsRouter from './routers/reports';
import SERVER from './config/server';
import getAllSubscriptions from './functions/subscriptions/getAllSubscriptions';
import { auth } from './config/firebase';

const app = express();
const port = SERVER.port;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.static('../client/build'));

// Reports router
app.use('/reports', reportsRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

(async () => {
  await auth();
  getAllSubscriptions();
})();

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
