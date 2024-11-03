import { Feed as PrismaFeed } from '@prisma/client';
import { Pagination } from './shared.type';

export interface GetFeedsQueryString extends Pagination {}
export type Feed = PrismaFeed;
