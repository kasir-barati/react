import cors from 'cors';
import express from 'express';
import { join } from 'path';
import { feedsRoutes } from './routes/feeds.route.mjs';
import { newsRoutes } from './routes/news.route.mjs';
import { getEnvVariables } from './utils/env-variable.util.mjs';

const app = express();
const { port } = getEnvVariables();

app.use(cors());
app.use(express.json());
app.use(
  '/assets',
  express.static(join(import.meta.dirname, 'assets')),
);

app.use('/news', newsRoutes);
app.use('/feeds', feedsRoutes);

app
  .listen(
    port,
    console.log.bind(this, `Listening at http://localhost:${port}`),
  )
  .on('error', console.error);
