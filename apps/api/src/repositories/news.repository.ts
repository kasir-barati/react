import { PrismaClient } from '@prisma/client';
import { GetAllNewsQueryString, News } from '@react/common';

export class NewsRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  /**@todo add missing id to have a deterministic sort an cursor based pagination */
  async getNews({
    previousCreatedAt,
    nextCreatedAt,
    limit,
  }: GetAllNewsQueryString) {
    if (nextCreatedAt) {
      return await this.prismaClient.$queryRaw<
        News[]
      >`SELECT id, title, created_at as "createdAt", updated_at as "updatedAt"
        FROM public.news_articles
        WHERE created_at > ${nextCreatedAt}::timestamp
        ORDER BY "createdAt" ASC
        LIMIT ${limit};`;
    }
    if (!previousCreatedAt) {
      return await this.prismaClient.$queryRaw<
        News[]
      >`SELECT id, title, created_at as "createdAt", updated_at as "updatedAt"
        FROM public.news_articles
        ORDER BY "createdAt" DESC
        LIMIT ${limit};`;
    }

    return await this.prismaClient.$queryRaw<
      News[]
    >`SELECT id, title, created_at as "createdAt", updated_at as "updatedAt"
      FROM public.news_articles
      WHERE created_at < ${previousCreatedAt}::timestamp
      ORDER BY "createdAt" DESC
      LIMIT ${limit};`;
  }

  async createNews(newsTitle: string) {
    const news = await this.prismaClient
      .$queryRaw<News>`INSERT INTO public.news_articles(id, created_at, updated_at, title)
    VALUES(gen_random_uuid(), NOW(), NOW(), ${newsTitle})
    RETURNING *`;

    return news;
  }

  // https://github.com/tc39/proposal-explicit-resource-management
  // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-2.html
  async [Symbol.dispose]() {
    await this.prismaClient.$disconnect();
  }
}
