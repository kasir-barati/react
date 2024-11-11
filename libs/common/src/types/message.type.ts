import { Message as PrismaMessage } from '@prisma/client';

export interface GetAllMessagesQueryString {
  limit: number;
  senderId: string;
  receiverId: string;
  currentCreatedAt?: string;
  currentMessageId?: string;
}
export interface PaginatedWithSeekMethodGetMessages {
  data: Message[];
  hasNextPage: boolean;
  currentPage: GetAllMessagesQueryString;
}
export type Message = PrismaMessage;
export interface CreateMessageDto {
  content: string;
  receiverId: string;
}
