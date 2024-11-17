import { FilterUsersQueryString } from '@react/common';
import { Request, Router } from 'express';
import { UserRepository } from '../repositories/user.repository.js';
import { Prisma } from '../utils/prisma.util.js';

using userRepository = new UserRepository(Prisma.prismaClient);

export const usersRoutes = Router();

usersRoutes.get(
  '/',
  async (
    req: Request<
      unknown,
      unknown,
      unknown,
      FilterUsersQueryString,
      unknown
    >,
    res,
  ) => {
    const { name } = req.query;
    const users = await userRepository.getUsers(name);

    res.status(200).send(users);
  },
);

usersRoutes.get('/:id/profile', async (req, res) => {
  const { id } = req.params;
  const userProfile = await userRepository.getUser(id);

  res.status(200).json(userProfile);
});
