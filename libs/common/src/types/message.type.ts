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
  nextPage?: GetAllMessagesQueryString;
}
export type Message = PrismaMessage;
export interface CreateMessageDto {
  content: string;
  receiverId: string;
}
export interface CreatedMessageDto {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  createdAt: string;
  updatedAt: string;
}
