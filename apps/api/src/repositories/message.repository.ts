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
    const {
      nextPageCount = 0,
      nextPageCursor,
      data = [],
    } = await this.prismaClient.$queryRaw<{
      data: Message[];
      nextPageCursor: { createdAt: string; id: string };
      nextPageCount: number | null;
    }>`
    WITH filtered_messages AS (
      SELECT id, sender_id AS "senderId", receiver_id AS "receiverId", created_at as "created_at", updated_at as "updatedAt", content
      FROM public.messages
      WHERE sender_id = ${senderId}
            AND receiver_id = ${receiverId}
            ${
              currentCreatedAt
                ? Prisma.sql`AND (created_at, id) < (${currentCreatedAt}::timestamp, ${currentMessageId})`
                : Prisma.empty
            }
      ORDER BY created_at DESC, id DESC
      LIMIT ${limit}::bigint
      ), last_filtered_message AS (
        SELECT *
        FROM filtered_messages
        ORDER BY created_at ASC
        LIMIT 1
      ), next_page_count AS (
        SELECT count.count
        FROM (SELECT COUNT(public.messages.id), public.messages.created_at
              FROM public.messages, last_filtered_message
              WHERE public.messages.sender_id = ${senderId}
                    AND public.messages.receiver_id = ${receiverId}
                    AND (public.messages.created_at, public.messages.id) < (last_filtered_message.created_at, last_filtered_message.id)
              GROUP BY public.messages.created_at, public.messages.id
              ORDER BY public.messages.created_at DESC, public.messages.id DESC
              LIMIT ${limit}::bigint
             ) AS count
      )
      SELECT
        (SELECT JSONB_AGG(TO_JSONB(messages))
         FROM (SELECT *
               FROM filtered_messages
              ) as messages
        ) AS data,
        (SELECT *
         FROM next_page_count
        ) AS nextPageCount,
        (SELECT JSON_BUILD_OBJECT('createdAt', created_at, 'id', id)
         FROM last_filtered_message
        ) AS nextPageCursor`;
    const hasNextPage =
      Number.isFinite(nextPageCount) && nextPageCount !== 0;

    console.log(data, nextPageCursor, nextPageCount);

    return {
      data,
      nextPage: hasNextPage
        ? {
            limit,
            senderId,
            receiverId,
            currentMessageId: nextPageCursor.id,
            currentCreatedAt: nextPageCursor.createdAt,
          }
        : undefined,
    };
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
