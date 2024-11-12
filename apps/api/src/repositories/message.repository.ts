import { Prisma, PrismaClient } from '@prisma/client';
import {
  GetAllMessagesQueryString,
  Message,
  PaginatedWithSeekMethodGetMessages,
} from '@react/common';

export class MessageRepository {
  // TODO: abstract away this part to dbClient
  constructor(private readonly prismaClient: PrismaClient) {}

  async getMessages({
    limit,
    senderId,
    receiverId,
    currentCreatedAt,
    currentMessageId,
  }: GetAllMessagesQueryString): Promise<PaginatedWithSeekMethodGetMessages> {
    const result = await this.prismaClient.$queryRaw<
      {
        data: Message[];
        nextPageCursor: { createdAt: string; id: string };
        nextPageCount: number | null;
      }[]
    >`
    WITH filtered_messages AS (
      SELECT id, sender_id AS "senderId", receiver_id AS "receiverId", created_at as "createdAt", updated_at as "updatedAt", content
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
        ORDER BY "createdAt" ASC
        LIMIT 1
      ), next_page_messages_ids AS (
        SELECT public.messages.id
        FROM public.messages, last_filtered_message
        WHERE public.messages.sender_id = '754cf10b-d3a3-4851-af9a-11ad51dc8357'
              AND public.messages.receiver_id = 'b9e0c6b9-4c7f-441f-b6cc-1cf6521c141b'
              AND (public.messages.created_at, public.messages.id) < (last_filtered_message."createdAt", last_filtered_message.id)
        ORDER BY public.messages.created_at DESC, public.messages.id DESC
        LIMIT 10
      ), next_page_count AS (
        SELECT count(*)
        FROM next_page_messages_ids
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
        (SELECT JSON_BUILD_OBJECT('createdAt', "createdAt", 'id', id)
         FROM last_filtered_message
        ) AS nextPageCursor`;
    const {
      nextPageCount = 0,
      nextPageCursor,
      data = [],
    } = result[0];
    const hasNextPage =
      Number.isFinite(nextPageCount) && nextPageCount !== 0;

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
    const result = await this.prismaClient.$queryRaw<
      Message[]
    >`INSERT INTO public.messages (id, created_at, updated_at, content, sender_id, receiver_id)
        VALUES (gen_random_uuid(), NOW(), NOW(), ${content}, ${senderId}, ${receiverId})
        RETURNING id, created_at as "createdAt", updated_at as "updatedAt", content, sender_id as "senderId", receiver_id as "receiverId"`;
    const message = result[0];

    return message;
  }

  // https://github.com/tc39/proposal-explicit-resource-management
  // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-2.html
  async [Symbol.dispose]() {
    await this.prismaClient.$disconnect();
  }
}
