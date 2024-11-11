import { PrismaClient } from '@prisma/client';

export class Prisma {
  private static _prismaClient?: PrismaClient;

  static get prismaClient() {
    if (!Prisma._prismaClient) {
      Prisma._prismaClient = new PrismaClient({
        log: ['query'],
      });
    }

    // @ts-ignore
    Prisma._prismaClient.$on('query', async (e) => {
      console.log(`${e?.['query']} ${e?.['params']}`);
    });

    return Prisma._prismaClient;
  }
}
