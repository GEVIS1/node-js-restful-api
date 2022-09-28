/* eslint-disable no-console */
import { Prisma, Role } from '@prisma/client';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  AuthorizedRequest,
  JWT,
} from '../../middleware/v2/authorization/authRoute';
import { prisma } from '../../utils/v2/prisma/prisma';

const allRoles: Role[] = ['BASIC_USER', 'ADMIN_USER', 'SUPER_ADMIN_USER'];

/**
 * Check user permissions
 * @param user Decoded JWT with the user's id in it
 * @param allowedRoles Array of authorized roles
 * @returns A boolean reflecting whether the user is authorized
 */
const isAuthorized = async (user: JWT, allowedRoles: Role[]) => {
  const userAuthorized = await prisma.user.findFirst({
    where: {
      id: user.id,
      role: { in: allowedRoles },
    },
  });

  if (!userAuthorized) {
    return [false, null] as [boolean, null];
  } else return [true, userAuthorized] as [boolean, User];
};

const getUsers = async (req: AuthorizedRequest, res: Response) => {
  try {
    if (req.user === undefined) {
      throw Error('Unauthorized');
    }

    // Check if user is in authorization list
    const [authorized] = await isAuthorized(req.user, allRoles);

    if (!authorized) {
      throw Error('Unauthorized');
    }

    /**
     * Dynamically create the in array for the findMany filter.
     * Since as the permission level goes up the number goes up, we can simply slice the allRoles array
     * from 0 to the index of our role.
     *
     * Index:                 0             1                 2
     * const allRoles = ['BASIC_USER', 'ADMIN_USER', 'SUPER_ADMIN_USER']
     *
     * There are three cases here:
     * role = BASIC_USER:
     * roleIndex = 0
     * viewableRoles = ['BASIC_USER']
     *
     * role = ADMIN_USER:
     * roleIndex = 1
     * viewableRoles = ['BASIC_USER', 'ADMIN_USER']
     *
     * role = SUPER_ADMIN_USER:
     * roleIndex = 2
     * viewableRoles = ['BASIC_USER', 'ADMIN_USER', 'SUPER_ADMIN_USER']
     */
    const start = 0;
    let end = 0;
    const roleIndex = allRoles.indexOf(req.user.role) + 1;

    // Safeguard index in case an exception happens
    if (roleIndex < 0 || roleIndex > allRoles.length) {
      throw Error('Unauthorized');
    } else {
      end = roleIndex;
    }

    const viewableRoles: Role[] = allRoles.slice(start, end);

    const query: Prisma.UserFindManyArgs = {
      where: {
        role: {
          in: viewableRoles,
        },
      },
    };

    const userData = await prisma.user.findMany(query);

    return res.status(StatusCodes.OK).json({
      success: true,
      data: userData,
    });
  } catch (err) {
    if (err instanceof Error && err.message === 'Unauthorized') {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ success: false, error: 'Unauthorized' });
    } else
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ success: false, error: err });
  }
};

export { getUsers };
