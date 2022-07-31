import PrismaClient from '../../utils/prisma/prisma';
import { StatusCodes } from 'http-status-codes';
import { Response } from 'express';

const checkAuthorization = async (id: string, res: Response) => {
  const user = await PrismaClient.user.findUnique({
    where: { id: Number(id) },
  });
  if (user.role !== 'ADMIN_USER') {
    return res.status(StatusCodes.FORBIDDEN).json({
      msg: 'Not authorized to access this route',
    });
  }
};

export default checkAuthorization;
