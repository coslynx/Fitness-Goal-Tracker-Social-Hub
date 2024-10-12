import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';
import { errorCodes } from '@shared/utils/constants/errorCodes';
import { User } from '@shared/utils/types/user';
import { httpStatusCodes } from '@shared/utils/constants/httpStatusCodes';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(httpStatusCodes.UNAUTHORIZED).json({ message: errorCodes.UNAUTHORIZED });
  }

  if (req.method === 'GET') {
    try {
      const user: User = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: {
          goals: true,
          posts: true,
        },
      });

      if (!user) {
        return res.status(httpStatusCodes.NOT_FOUND).json({ message: errorCodes.USER_NOT_FOUND });
      }

      return res.status(httpStatusCodes.OK).json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: errorCodes.UNEXPECTED_ERROR });
    }
  } else if (req.method === 'PUT') {
    try {
      const { name, email } = req.body;

      const updatedUser = await prisma.user.update({
        where: { id: session.user.id },
        data: { name, email },
      });

      return res.status(httpStatusCodes.OK).json(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: errorCodes.USER_UPDATE_FAILED });
    }
  } else {
    return res.status(httpStatusCodes.METHOD_NOT_ALLOWED).json({ message: 'Method not allowed' });
  }
}