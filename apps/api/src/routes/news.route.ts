import {
  GetAllNewsQueryString,
  News,
  PaginatedWithSeekMethod,
} from '@react/common';
import { Request, Router } from 'express';
import { Prisma } from '../utils/prisma.util.js';
import { Repo } from '../utils/repo.util.js';

const repo = new Repo(Prisma.prismaClient);

export const newsRoutes = Router();

newsRoutes.get(
  '/',
  async (
    req: Request<
      unknown,
      unknown,
      unknown,
      GetAllNewsQueryString,
      unknown
    >,
    res,
  ) => {
    const { previousCreatedAt, nextCreatedAt } = req.query;
    const limit = Number(req.query.limit);
    const newsArticles = await repo.getNews({
      previousCreatedAt,
      nextCreatedAt,
      limit,
    });
    console.log(
      newsArticles,
      previousCreatedAt,
      nextCreatedAt,
      limit,
    );
    const response: PaginatedWithSeekMethod<News> = {
      data: newsArticles,
      limit,
    };

    res.status(200).send(response);
  },
);
