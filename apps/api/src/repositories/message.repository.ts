import { Prisma, PrismaClient } from '@prisma/client';
import {
  GetAllMessagesQueryString,
  Message,
  PaginatedWithSeekMethodGetMessages,
} from '@react/common';

export class MessageRepository {
  // TODO: abstract away this part to dbClient
  constructor(private readonly prismaClient: PrismaClient) {}

  async getMessages(
    currentPage: GetAllMessagesQueryString,
  ): Promise<PaginatedWithSeekMethodGetMessages> {
    const {
      limit,
      senderId,
      receiverId,
      currentCreatedAt,
      currentMessageId,
    } = currentPage;
    const { count = 0, data = [] } = await this.prismaClient
      .$queryRaw<{
      data: Message[];
      count: number;
    }>`SELECT
        (SELECT count.count
         FROM (SELECT COUNT(id), created_at
               FROM public.messages
               WHERE sender_id = '${senderId}'
                     AND receiver_id = '${receiverId}'
                     ${
                       currentCreatedAt
                         ? Prisma.sql`AND (created_at, id) < (${currentCreatedAt}::timestamp, ${currentMessageId})`
                         : Prisma.empty
                     }
               GROUP BY created_at, id
               ORDER BY created_at DESC, id DESC
               LIMIT ${limit}::bigint
              ) AS count
        ),
        (SELECT JSONB_AGG(TO_JSONB(messages))
         FROM (SELECT *
               FROM public.messages
               WHERE sender_id = '${senderId}'
                     AND receiver_id = '${receiverId}'
                     ${
                       currentCreatedAt
                         ? Prisma.sql`AND (created_at, id) < (${currentCreatedAt}::timestamp, ${currentMessageId})`
                         : Prisma.empty
                     }
               ORDER BY created_at DESC, id DESC
               LIMIT ${limit}::bigint
              ) AS messages
        ) AS data`;
    const hasNextPage = Number.isFinite(count) && count !== 0;

    return { data, hasNextPage, currentPage };
  }

  async createMessage(
    content: string,
    senderId: string,
    receiverId: string,
  ): Promise<Message> {
    return this.prismaClient
      .$queryRaw<Message>`INSERT INTO public.messages (id, created_at, updated_at, content, sender_id, receiver_id)
        VALUES (gen_random_uuid(), NOW(), NOW(), ${content}, ${senderId}, ${receiverId})
        RETURNING id, created_at as "createdAt", updated_at as "updatedAt", content, sender_id as "senderId", receiver_id as "receiverId"`;
  }

  // https://github.com/tc39/proposal-explicit-resource-management
  // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-2.html
  async [Symbol.dispose]() {
    await this.prismaClient.$disconnect();
  }
}
