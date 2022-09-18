/**
 * The auth.ts file holds the functions for the authentication Controller.
 * These functions will be used in the auth Router sitting on the /auth endpoint.
 * The functions for creating, updating and deleting users are identical for all user types.
 * Only BASIC_USER type users can be created with the createUser function.
 * ADMIN_USER and SUPER_ADMIN_USERs will be seeded through other means.
 */

import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { StatusCodes } from 'http-status-codes';
import { Prisma, Role } from '@prisma/client';
import { Optional } from 'utility-types';

import { prisma } from '../../utils/v2/prisma/prisma';
import { createUserSchema } from '../../validators/v2/user';
import { baseURL } from '../../utils/v2/axios';
import { UserCreateOneSchema } from '../../../prisma/v2/zod-schemas/schemas/createOneUser.schema';
import { ZodError } from 'zod';

// Ensure prisma.user isn't undefined
if (prisma?.user === undefined) throw Error('Prisma is undefined.');

// Extract user delegate for type information
const user: Prisma.UserDelegate<Prisma.RejectPerModel> = prisma.user;

// Sending the password in the reply isn't desired
type UserNoPassword = Optional<Prisma.UserCreateInput, 'password'>;

interface IUserCreateError extends Error {
  message: string;
  data: UserNoPassword;
}

interface RegisterBody {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  confirm: string;
  avatar: string;
  role: Role;
}

interface RegisterRequest extends Request {
  body: RegisterBody;
}

const register = async (req: RegisterRequest, res: Response) => {
  try {
    // Grab avatar
    const avatar = `${baseURL}${uuid()}.svg`;

    /**
     * zod does not have functionality to refer to another field from what I've found,
     * so create the type dynamically and compare the password with the compare field
     * by creating a RegEx string with the original password.
     * I.E:
     * {
     *    compare: z.string().match(new Regex(`req.body.password`))
     * }
     */
    const UserSchema = createUserSchema(req.body);

    // Validate extended rules
    const validatedData: Prisma.UserCreateInput & { confirm?: string } =
      UserSchema.parse({ ...req.body, avatar });

    delete validatedData.confirm;

    // Validate that the data fits the schema and save the return object
    const userData = UserCreateOneSchema.parse({ data: { ...validatedData } });

    // Check if the username or email already exists
    const exists = await user.findFirst({
      where: {
        OR: [
          {
            username: userData.data.username,
          },
          {
            email: userData.data.email,
          },
        ],
      },
    });

    // Throw an IUserCreateError object if the user exists
    if (exists) {
      const data: UserNoPassword = { ...userData.data };
      delete data.password;

      const err: IUserCreateError = {
        message: 'Could not create user, username or email taken',
        data,
        name: 'UserCreateError',
      };
      throw err;
    }

    // Create the new user
    const createdUser: UserNoPassword = await user.create(userData);

    // Let's hide the password from the response
    delete createdUser.password;

    return res.status(StatusCodes.CREATED).json({
      success: true,
      msg: 'User successfully registered',
      data: createdUser,
    });
  } catch (err) {
    /**
     * I considered using Bad Request (400) here, but I like Unprocessable Entity (422)
     * https://tools.ietf.org/html/rfc2518#section-10.3
     */
    if (err instanceof ZodError)
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ success: false, error: err });
    // Eslint wants me to remove the parens here, but that breaks the syntax, so disabling for this case only
    // eslint-disable-next-line no-extra-parens
    else if ((err as IUserCreateError).name === 'UserCreateError')
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, error: err });
    else
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ success: false, error: err });
  }
};

export { register };
