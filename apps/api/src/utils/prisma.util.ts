import { PrismaClient } from '@prisma/client';

export class Prisma {
  private static _prismaClient?: PrismaClient;

  static get prismaClient() {
    if (!Prisma._prismaClient) {
      Prisma._prismaClient = new PrismaClient();
    }

    return Prisma._prismaClient;
  }
}
