import {
  CreateMessageDto,
  GetAllMessagesQueryString,
} from '@react/common';
import { Request, Router } from 'express';
import { MessageRepository } from '../repositories/message.repository';
import { Prisma } from '../utils/prisma.util';

using messageRepository = new MessageRepository(Prisma.prismaClient);

export const messagesRoutes = Router();

messagesRoutes.get(
  '/',
  async (
    req: Request<
      unknown,
      unknown,
      unknown,
      GetAllMessagesQueryString,
      unknown
    >,
    res,
  ) => {
    const {
      currentCreatedAt,
      currentMessageId,
      limit,
      receiverId,
      senderId,
    } = req.query;
    const response = await messageRepository.getMessages({
      currentCreatedAt,
      currentMessageId,
      limit,
      receiverId,
      senderId,
    });

    res.status(200).json(response);
  },
);

messagesRoutes.put('/{:id}', async (req, res) => {
  const id = req.params?.['id'];
  const body: CreateMessageDto = req.body;
  // Since we're not gonna implement JWT here we will hard code the senderId but in real world app you would do something like:
  const senderId =
    /*req.user.id*/ '754cf10b-d3a3-4851-af9a-11ad51dc8357';

  if (id) {
    // Perform a full update here.
    return;
  }

  const message = await messageRepository.createMessage(
    body.content,
    senderId,
    body.receiverId,
  );

  res.status(201).json(message);
});
