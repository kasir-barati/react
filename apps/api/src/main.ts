import cors from 'cors';
import express from 'express';
import { join } from 'path';
import { getEnvVariables } from './utils/env-variable.util.mjs';
import { Prisma } from './utils/prisma.util.mjs';
import { Repo } from './utils/repo.util.mjs';

const app = express();
const { port } = getEnvVariables();
using repo = new Repo(Prisma.prismaClient);

app.use(cors());
app.use(express.json());
app.use(
  '/assets',
  express.static(join(import.meta.dirname, 'assets')),
);

app.get('/feeds', async (req, res) => {
  const { page, limit } = req.query;
  const feeds = await repo.getFeeds(Number(page), Number(limit));

  res.status(200).send({ data: feeds, page, limit });
});

app
  .listen(
    port,
    console.log.bind(this, `Listening at http://localhost:${port}`),
  )
  .on('error', console.error);
