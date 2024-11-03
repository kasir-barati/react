import { Feed, GetFeedsQueryString, Paginated } from '@react/common';
import { Request, Router } from 'express';
import { Prisma } from '../utils/prisma.util.mjs';
import { Repo } from '../utils/repo.util.mjs';

using repo = new Repo(Prisma.prismaClient);

export const feedsRoutes = Router();

feedsRoutes.get(
  '/',
  async (
    req: Request<
      unknown,
      unknown,
      unknown,
      GetFeedsQueryString,
      unknown
    >,
    res,
  ) => {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const feeds = await repo.getFeeds(page, limit);
    const response: Paginated<Feed> = { data: feeds, page, limit };

    res.status(200).send(response);
  },
);
