import cors from 'cors';
import express from 'express';
import { join } from 'path';
import { feedsRoutes } from './routes/feeds.route.js';
import { messagesRoutes } from './routes/messages.route.js';
import { newsRoutes } from './routes/news.route.js';
import { usersRoutes } from './routes/users.route.js';
import { getEnvVariables } from './utils/env-variable.util.js';

const app = express();
const { port } = getEnvVariables();

app.use(cors());
app.use(express.json());
app.use('/assets', express.static(join(__dirname, 'assets')));

app.use('/news', newsRoutes);
app.use('/feeds', feedsRoutes);
app.use('/users', usersRoutes);
app.use('/messages', messagesRoutes);

app
  .listen(
    port,
    console.log.bind(this, `Listening at http://localhost:${port}`),
  )
  .on('error', console.error);
