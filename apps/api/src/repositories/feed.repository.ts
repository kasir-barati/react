import { PrismaClient } from '@prisma/client';
import { Feed } from '@react/common';

export class FeedRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async getFeeds(page: number, limit: number) {
    const offset = (page - 1) * limit;
    // Sort from lowest value to highest value
    /*
      In psql LIMIT and OFFSET statements go after WHERE clause, GROUP BY, and ORDER BY statements.
     */
    const feeds = await this.prismaClient.$queryRaw<Feed[]>`SELECT * 
      FROM public.feeds
      ORDER BY created_at asc
      OFFSET ${offset}
      LIMIT ${limit};`;

    return feeds;
  }

  /**
   * @todo Prone to SQL injection but had no luck with Prisma.sql and Prisma.join
   */
  async bulkFeeds(titles: string[]) {
    const values = titles.map((title) => {
      return `(gen_random_uuid(), NOW(), NOW(), '${title}')`;
    });
    const feeds = await this.prismaClient.$queryRawUnsafe<
      Feed[]
    >(`INSERT INTO public.feeds(id, created_at, updated_at, title)
    VALUES ${values.join(', ')}
    RETURNING *;`);

    return feeds;
  }

  async createFeed(feedTitle: string) {
    const result = await this.prismaClient.$queryRaw<
      Feed[]
    >`INSERT INTO public.feeds(id, created_at, updated_at, title)
    VALUES(gen_random_uuid(), NOW(), NOW(), ${feedTitle})
    RETURNING *`;
    const feed = result[0];

    return feed;
  }

  // https://github.com/tc39/proposal-explicit-resource-management
  // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-2.html
  async [Symbol.dispose]() {
    await this.prismaClient.$disconnect();
  }
}
