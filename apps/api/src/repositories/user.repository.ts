import { PrismaClient } from '@prisma/client';
import { User } from '@react/common';

export class UserRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async getUser(id: string): Promise<User> {
    return this.prismaClient
      .$queryRaw<User>`SELECT id, created_at as "createdAt", updated_at as "updatedAt", name, email
        FROM public.users
        WHERE id = '${id}'`;
  }

  async getUsers(name: string): Promise<User[]> {
    const whereCondition = `%${name}%`;

    /**
     `SELECT id, created_at as "createdAt", updated_at as "updatedAt", name, email
      FROM public.users
      WHERE name ILIKE '${whereCondition}'`;
     */

    return this.prismaClient.$queryRaw<
      User[]
    >`SELECT id, created_at as "createdAt", updated_at as "updatedAt", name, email
      FROM public.users
      WHERE name = ${name}`;
  }

  async createUser(
    name: string,
    email: string,
    id?: string,
  ): Promise<User> {
    if (id) {
      return this.prismaClient
        .$queryRaw<User>`INSERT INTO public.users (id, created_at, updated_at, name, email)
          VALUES (${id}, NOW(), NOW(), ${name}, ${email})
          RETURNING id, created_at as "createdAt", updated_at as "updatedAt", name, email`;
    }

    return this.prismaClient
      .$queryRaw<User>`INSERT INTO public.users (id, created_at, updated_at, name, email)
        VALUES (gen_random_uuid(), NOW(), NOW(), ${name}, ${email})
        RETURNING id, created_at as "createdAt", updated_at as "updatedAt", name, email`;
  }

  // https://github.com/tc39/proposal-explicit-resource-management
  // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-2.html
  async [Symbol.dispose]() {
    await this.prismaClient.$disconnect();
  }
}
