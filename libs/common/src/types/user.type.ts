import { User as PrismaUser } from '@prisma/client';

export interface FilterUsersQueryString {
  name: string;
}
export type User = PrismaUser;
