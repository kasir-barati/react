import cors from 'cors';
import express, { Request } from 'express';
import { join } from 'path';
import { Pagination } from './types';
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

app.get(
  '/feeds',
  async (
    req: Request<unknown, unknown, unknown, Pagination, unknown>,
    res,
  ) => {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const feeds = await repo.getFeeds(page, limit);

    res.status(200).send({ data: feeds, page, limit });
  },
);

app
  .listen(
    port,
    console.log.bind(this, `Listening at http://localhost:${port}`),
  )
  .on('error', console.error);
