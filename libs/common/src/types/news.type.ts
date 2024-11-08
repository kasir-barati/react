import { News as PrismaNews } from '@prisma/client';
import { PaginationWithSeekMethod } from './shared.type';

export interface GetAllNewsQueryString
  extends PaginationWithSeekMethod {}
export type News = PrismaNews;
