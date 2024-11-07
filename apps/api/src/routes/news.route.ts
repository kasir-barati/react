import { GetAllNewsQueryString, sleep } from '@react/common';
import { Request, Router } from 'express';
import { Prisma } from '../utils/prisma.util.js';
import { Repo } from '../utils/repo.util.js';

const repo = new Repo(Prisma.prismaClient);

export const newsRoutes = Router();

sleep(1);

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
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const newsArticles = await repo.getNews({ page, limit });
    // const response: Paginated<News> = {
    //   data: newsArticles,
    //   page,
    //   limit,
    // };

    // res.status(200).send(response);
  },
);
