import {
  GetAllNewsQueryString,
  News,
  PaginatedWithSeekMethod,
} from '@react/common';
import { Request, Router } from 'express';
import { NewsRepository } from '../repositories/news.repository.js';
import { Prisma } from '../utils/prisma.util.js';

const newsRepository = new NewsRepository(Prisma.prismaClient);

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
    const newsArticles = await newsRepository.getNews({
      previousCreatedAt,
      nextCreatedAt,
      limit,
    });
    const response: PaginatedWithSeekMethod<News> = {
      data: newsArticles,
      limit,
    };

    res.status(200).send(response);
  },
);
