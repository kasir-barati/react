import { News as PrismaNews } from '@prisma/client';
import { Pagination } from './shared.type';

export interface GetAllNewsQueryString extends Pagination {}
export type News = PrismaNews;
