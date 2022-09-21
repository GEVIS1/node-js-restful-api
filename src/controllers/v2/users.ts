/* eslint-disable no-console */
import { Role } from '@prisma/client';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  AuthorizedRequest,
  JWT,
} from '../../middleware/v2/authorization/authRoute';
import { prisma } from '../../utils/v2/prisma/prisma';

const getUsersAuthorization: Role[] = ['ADMIN_USER', 'SUPER_ADMIN_USER'];

const isAuthorized = async (user: JWT, allowedRoles: Role[]) => {
  const userAuthorized = await prisma.user.findFirst({
    where: {
      id: user.id,
      OR: [
        {
          role: allowedRoles[0],
        },
        {
          role: allowedRoles[1],
        },
      ],
    },
  });

  console.log(userAuthorized);
  console.log('allowedRoles[0]', allowedRoles[0]);
  console.log('allowedRoles[1]', allowedRoles[1]);

  return userAuthorized ? true : false;
};

const getUsers = async (req: AuthorizedRequest, res: Response) => {
  try {
    if (req.user === undefined) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ success: false, error: 'Unauthorized' });
    }
    const authorized = await isAuthorized(req.user, getUsersAuthorization);
    console.log(req.user);
    console.log(`Are we authorized? ${authorized}`);
    console.log('getUsersAuthorization', getUsersAuthorization);

    return res.status(StatusCodes.OK).json({
      success: true,
      data: { authorized, permittedRoles: getUsersAuthorization },
    });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: err });
  }
};

export { getUsers };
