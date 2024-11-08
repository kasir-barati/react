import { Feed as PrismaFeed } from '@prisma/client';
import { PaginationWithOffset } from './shared.type';

export interface GetFeedsQueryString extends PaginationWithOffset {}
export type Feed = PrismaFeed;
