import {
  Feed,
  GetFeedsQueryString,
  PaginatedWithOffset,
} from '@react/common';
import { Request, Router } from 'express';
import { FeedRepository } from '../repositories/feed.repository.js';
import { Prisma } from '../utils/prisma.util.js';

using feedRepository = new FeedRepository(Prisma.prismaClient);

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
    const feeds = await feedRepository.getFeeds(page, limit);
    const response: PaginatedWithOffset<Feed> = {
      data: feeds,
      page,
      limit,
    };

    res.status(200).send(response);
  },
);
