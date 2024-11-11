import { News as PrismaNews } from '@prisma/client';

export interface GetAllNewsQueryString {
  previousCreatedAt?: string;
  nextCreatedAt?: string;
  limit: number;
}
export type News = PrismaNews;
