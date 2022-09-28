/* eslint-disable no-console */
import { Prisma, Role, User } from '@prisma/client';
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
 * @param requestingUser Decoded JWT with the user who is trying to update data's id in it
 * @param userToBeUpdated User data of the user to be updated
 * @param allowedRoles Array of roles the requesting user is allowed to modify
 * @returns An array with a boolean reflecting whether the user is authorized and the data of the user to be updated
 */
const isAuthorized = async (
  requestingUser: JWT,
  allowedRoles: Role[],
  userToBeUpdated: User | null = null
) => {
  const userAuthorized = await prisma.user.findFirst({
    where: {
      id: userToBeUpdated?.id,
      role: { in: allowedRoles },
    },
  });

  if (userAuthorized) {
    return [true, userAuthorized] as [boolean, User];
  } else if (userToBeUpdated && requestingUser.id === userToBeUpdated.id) {
    return [true, userToBeUpdated] as [boolean, User];
  } else {
    return [false, null] as [boolean, null];
  }
};

const getUsers = async (req: AuthorizedRequest, res: Response) => {
  try {
    if (req.user === undefined) {
      throw Error('Unauthorized');
    }

    // Check if user is in authorization list
    const [authorized, user] = await isAuthorized(req.user, allRoles);

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

    // If role is a basic user, or something goes wrong with the permission validation only return the requesting user's data
    if (
      req.user.role === 'BASIC_USER' ||
      roleIndex < 0 ||
      roleIndex > allRoles.length
    ) {
      return res.status(StatusCodes.OK).json({
        success: true,
        data: user,
      });
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
