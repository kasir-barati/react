import { PrismaClient } from '@prisma/client';
import { User } from '@react/common';

export class UserRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async getUser(id: string): Promise<User> {
    const result = await this.prismaClient.$queryRaw<
      User[]
    >`SELECT id, created_at as "createdAt", updated_at as "updatedAt", name, email
        FROM public.users
        WHERE id = '${id}'`;
    const user = result[0];

    return user;
  }

  /**
   * @todo Enable user to search more freely instead of entering the exact name
   */
  async getUsers(name: string): Promise<User[]> {
    return this.prismaClient.$queryRaw<
      User[]
    >`SELECT id, created_at as "createdAt", updated_at as "updatedAt", name, email
      FROM public.users
      WHERE name ILIKE ${`%${name}%`}`;
  }

  async createUser(
    name: string,
    email: string,
    id?: string,
  ): Promise<User> {
    if (id) {
      const result = await this.prismaClient.$queryRaw<
        User[]
      >`INSERT INTO public.users (id, created_at, updated_at, name, email)
      VALUES (${id}, NOW(), NOW(), ${name}, ${email})
      RETURNING id, created_at as "createdAt", updated_at as "updatedAt", name, email`;
      const user = result[0];

      return user;
    }

    const result = await this.prismaClient.$queryRaw<
      User[]
    >`INSERT INTO public.users (id, created_at, updated_at, name, email)
        VALUES (gen_random_uuid(), NOW(), NOW(), ${name}, ${email})
        RETURNING id, created_at as "createdAt", updated_at as "updatedAt", name, email`;
    const user = result[0];

    return user;
  }

  // https://github.com/tc39/proposal-explicit-resource-management
  // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-2.html
  async [Symbol.dispose]() {
    await this.prismaClient.$disconnect();
  }
}
