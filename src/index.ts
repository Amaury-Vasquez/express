import express from 'express';

import { config } from './config';
import { usersApi } from './routes/usersApi';

const app = express();

app.use(express.json());
usersApi(app);

app.listen(config.port, () =>
  console.log(`Running at http://localhost:${config.port}/`)
);

process.on('uncaughtException', (err) => console.error(err));
process.on('SIGTERM', () => {});
