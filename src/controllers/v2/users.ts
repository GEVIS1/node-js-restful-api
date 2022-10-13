/**
 * The users controller file contains the functions for reading, creating and manipulating users.
 */
import { Prisma, Role, User } from '@prisma/client';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import bcryptjs from 'bcryptjs';
import { Optional } from 'utility-types';

import {
  AuthorizedRequest,
  JWT,
} from '../../middleware/v2/authorization/authRoute';
import { avatarBaseUrl } from '../../utils/v2/axios';
import { prisma } from '../../utils/v2/prisma/prisma';
import {
  createUpdateUserSchema,
  UserCreateInput,
} from '../../validators/v2/user';
import { UserUpdateOneSchema } from '../../../prisma/v2/zod-schemas/schemas/updateOneUser.schema';
import { unauthorizedResponse, UserNoPassword } from './auth';

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

/**
 * Controller function for getting all users
 * @param req Express Request with JWT
 * @param res Express Response
 * @returns All user data or error.
 */
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

    // If role is a basic user, or something goes wrong with the permission validation only return the requesting user's data
    if (
      req.user.role === 'BASIC_USER' ||
      roleIndex < 0 ||
      roleIndex > allRoles.length
    ) {
      return res.status(StatusCodes.OK).json({
        success: true,
        data: await prisma.user.findFirst({ where: { id: req.user.id } }),
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

    const manyUserData = await prisma.user.findMany(query);

    return res.status(StatusCodes.OK).json({
      success: true,
      data: manyUserData,
    });
  } catch (err) {
    if (err instanceof Error && err.message === 'Unauthorized') {
      return res.status(StatusCodes.FORBIDDEN).json(unauthorizedResponse);
    } else
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ success: false, error: err });
  }
};

/**
 * Controller function for getting a specific user
 * @param req Express Request with JWT
 * @param res Express Response
 * @returns User data or error.
 */
const getUser = async (req: AuthorizedRequest, res: Response) => {
  try {
    if (req.user === undefined) {
      throw Error('Unauthorized');
    }

    const id = Number.parseInt(req.params.id);

    if (!id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'No user id supplied or incorrect id',
      });
    }

    // Get user data
    const requestedUser = await prisma.user.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!requestedUser) {
      throw Error('User not found');
    }

    /**
     * If the user is attempting to get a user that is not themselves
     */
    if (req.user.id !== requestedUser.id) {
      /**
       * There is not a straight pattern to basic user, admin user and super admin user view permissions
       * so instead of generating them just hard code them.
       */
      const viewableRoles: Role[] = [];
      switch (req.user.role) {
        case 'BASIC_USER':
          break;

        case 'ADMIN_USER':
          viewableRoles.push('BASIC_USER', 'ADMIN_USER');
          break;

        case 'SUPER_ADMIN_USER':
          viewableRoles.push('BASIC_USER', 'ADMIN_USER', 'SUPER_ADMIN_USER');
          break;

        default:
          break;
      }

      // Check if user is in authorization list
      const [authorized] = await isAuthorized(
        req.user,
        viewableRoles,
        requestedUser
      );

      // If we are trying to view data that's not ours or not authorized
      if (!authorized) {
        throw Error('Unauthorized');
      }
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      data: requestedUser,
    });
  } catch (err) {
    if (err instanceof Error && err.message === 'Unauthorized') {
      return res.status(StatusCodes.FORBIDDEN).json(unauthorizedResponse);
    } else if (err instanceof Error && err.message === 'User not found') {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, error: err.message });
    }
    return (
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        // Why is this error wrap necessary.. there must be a more elegant way
        // eslint-disable-next-line no-extra-parens
        .json({ success: false, error: (err as Error).message })
    );
  }
};

/**
 * Controller function for updating a user
 * @param req Express Request with JWT
 * @param res Express Response
 * @returns Updated user data or error.
 */
const updateUser = async (req: AuthorizedRequest, res: Response) => {
  try {
    if (req.user === undefined) {
      throw Error('Unauthorized');
    }

    const id = Number.parseInt(req.params.id);

    if (!id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'No user id supplied or incorrect id',
      });
    }

    // Get user data
    const requestedUser = await prisma.user.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!requestedUser) {
      throw Error('User not found');
    }

    /**
     * If the user is attempting to update a user that is not themselves, and that user's role is not lower than their own
     * do not allow the operation.
     */
    const start = 0;
    const index = allRoles.indexOf(req.user.role);
    let end;
    if (index === -1 || index >= allRoles.length) {
      end = 0;
    } else {
      end = index;
    }
    const viewableRoles: Role[] = allRoles.slice(start, end);

    // Check if user is in authorization list
    const [authorized] = await isAuthorized(
      req.user,
      viewableRoles,
      requestedUser
    );

    // If we are trying to update data that's not ours or not authorized
    if (!authorized) {
      throw Error('Unauthorized');
    }

    /**
     * Now that we have ascertained that the user is allowed to update the data
     * we can do the necessary manipulations on the input data and validate it.
     */
    const {
      firstname: newFirstName,
      lastname: newLastName,
      username: newUsername,
      email: newEmail,
      password: newPassword,
      confirm: newConfirm,
    } = req.body;
    let newAvatar: string | undefined = undefined;

    if (req.body.avatar) {
      newAvatar = `${avatarBaseUrl}${req.body.avatar}.svg`;
    }

    // Create the object to update the user with
    const newUser: Optional<UserCreateInput, 'avatar'> = {
      firstname: newFirstName,
      lastname: newLastName,
      username: newUsername,
      email: newEmail,
      password: newPassword,
      confirm: newConfirm,
      avatar: newAvatar,
    };

    const UpdateUserSchema = createUpdateUserSchema(newUser as UserCreateInput);

    // Validate extended rules
    const validatedData = UpdateUserSchema.parse(newUser);

    delete validatedData.confirm;

    // Validate that the data fits the schema and that it is targeting the correct user
    const userData = UserUpdateOneSchema.parse({
      data: {
        ...validatedData,
      },
      where: {
        id: requestedUser.id,
      },
    });

    /**
     * If a new password is sent we've matched it with the confirm by this point
     * so store it in the new userData.
     */

    if (userData.data.password) {
      const salt = await bcryptjs.genSalt();
      userData.data.password = await bcryptjs.hash(
        userData.data.password as string,
        salt
      );
    }

    const resultData = await prisma.user.update(userData);

    // I have looked through the documentation and there is no exception for delete operators..
    // eslint-disable-next-line no-extra-parens
    delete (resultData as UserNoPassword).password;

    return res.status(StatusCodes.OK).json({
      success: true,
      message: `${resultData.username}'s information has successfully updated`,
      data: resultData,
    });
  } catch (err) {
    if (err instanceof Error && err.message === 'Unauthorized') {
      return res.status(StatusCodes.FORBIDDEN).json(unauthorizedResponse);
    } else if (err instanceof Error && err.message === 'User not found') {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, error: err.message });
    }
    return (
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        // Why is this error wrap necessary.. there must be a more elegant way
        // eslint-disable-next-line no-extra-parens
        .json({ success: false, error: (err as Error).message })
    );
  }
};

/**
 * Controller function for deleting a user
 * @param req Express Request with JWT
 * @param res Express Response
 * @returns Result of deletion or error.
 */
const deleteUser = async (req: AuthorizedRequest, res: Response) => {
  try {
    if (req.user === undefined) {
      throw Error('Unauthorized');
    }

    const id = Number.parseInt(req.params.id);

    if (!id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'No user id supplied or incorrect id',
      });
    }

    // Get user data
    const requestedUser = await prisma.user.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!requestedUser) {
      throw Error('User not found');
    }

    let deletableRoles: Role[] = [];

    switch (req.user.role) {
      case 'SUPER_ADMIN_USER':
        deletableRoles = ['BASIC_USER', 'ADMIN_USER'];
        break;
      default:
        break;
    }

    // Check if user is in authorization list
    const [authorized] = await isAuthorized(
      req.user,
      deletableRoles,
      requestedUser
    );

    // If we are trying to update data that's not ours or not authorized
    if (!authorized) {
      throw Error('Unauthorized');
    }

    const deletedUser = await prisma?.user.delete({
      where: {
        id,
      },
    });

    return res.status(StatusCodes.OK).json({
      success: true,
      message: `${deletedUser.username} has been successfully deleted`,
    });
  } catch (err) {
    if (err instanceof Error && err.message === 'Unauthorized') {
      return res.status(StatusCodes.FORBIDDEN).json(unauthorizedResponse);
    } else if (err instanceof Error && err.message === 'User not found') {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, error: err.message });
    }
    return (
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        // Why is this error wrap necessary.. there must be a more elegant way
        // eslint-disable-next-line no-extra-parens
        .json({ success: false, error: (err as Error).message })
    );
  }
};

export { getUsers, getUser, updateUser, deleteUser };
