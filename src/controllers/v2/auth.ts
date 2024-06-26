/**
 * The auth.ts file holds the functions for the authentication Controller.
 * These functions will be used in the auth Router sitting on the /auth endpoint.
 * The functions for creating, updating and deleting users are identical for all user types.
 * Only BASIC_USER type users can be created with the register function.
 * ADMIN_USER and SUPER_ADMIN_USERs will be seeded through other means.
 */

import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { StatusCodes } from 'http-status-codes';
import { Prisma, Role } from '@prisma/client';
import { Optional } from 'utility-types';

import { prisma } from '../../utils/v2/prisma/prisma';
import { createUserSchema, UserValidatedInput } from '../../validators/v2/user';
import { avatarBaseUrl } from '../../utils/v2/axios';
import { UserCreateOneSchema } from '../../../prisma/v2/zod-schemas/schemas/createOneUser.schema';
import { ZodError } from 'zod';
import { JWT } from '../../middleware/v2/authorization/authRoute';

type JWTEnv = { JWT_SECRET: jwt.Secret; JWT_LIFETIME: string };
const { JWT_SECRET, JWT_LIFETIME } = process.env as JWTEnv;

// Standard unauthorized response object
export const unauthorizedResponse = {
  success: false,
  error: 'Unauthorized',
};

// Ensure prisma.user isn't undefined
if (prisma?.user === undefined) throw Error('Prisma is undefined.');

// Extract user delegate for type information
const user: Prisma.UserDelegate<Prisma.RejectOnNotFound> = prisma.user;

// Sending the password in the reply isn't desired
export type UserNoPassword = Optional<Prisma.UserCreateInput, 'password'>;

interface IUserCreateError extends Error {
  message: string;
  data: UserNoPassword;
}

export interface RegisterBody {
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

const generateAvatar = () => `${avatarBaseUrl}${uuid()}.svg`;
const wordToAvatar = (word: string) => `${avatarBaseUrl}${word}.svg`;

const register = async (req: RegisterRequest, res: Response) => {
  try {
    // Grab avatar
    const avatar = generateAvatar();

    /**
     * zod does not have functionality to refer to another field from what I've found,
     * so create the type dynamically and compare the password with the compare field
     * by creating a RegEx string with the original password.
     * I.E:
     * {
     *    compare: z.string().match(new Regex(`req.body.password`))
     * }
     */
    const UserSchema = createUserSchema(req.body, 'BASIC_USER');

    // Validate extended rules
    const validatedData: UserValidatedInput = UserSchema.parse({
      ...req.body,
      avatar,
    });

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

    /**
     * A salt is random bits added to a password before it is hashed. Salts
     * create unique passwords even if two users have the same passwords.
     * They also protect against rainbow table attacks, so they are very important.
     */
    const salt = await bcryptjs.genSalt();

    /**
     * Generate a hash for a the password. The first argument
     * is a string to be hashed, in this case it's userData.data.password
     * and the salt, e.g., E1F53135E559C253.
     */
    userData.data.password = await bcryptjs.hash(userData.data.password, salt);

    // Create the new user
    const createdUser: UserNoPassword = await user.create(userData);

    // Let's hide the password from the response
    delete createdUser.password;

    return res.status(StatusCodes.CREATED).json({
      success: true,
      msg: `User ${userData.data.username} successfully registered`,
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

interface LoginBodyEmail {
  email: string;
  password: string;
}

interface LoginBodyUsername {
  username: string;
  password: string;
}

interface LoginRequest extends Request {
  /**
   * XOR the interfaces to avoid having the optional username and email
   */
  body: Prisma.XOR<LoginBodyEmail, LoginBodyUsername>;
}

const login = async (req: LoginRequest, res: Response) => {
  try {
    const { username, email, password } = req.body;

    /**
     * By default log in with email, but if email is not supplied
     * we will attempt to log in with the username
     */
    const loginUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (!loginUser) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ success: false, msg: 'Invalid email or username' });
    }

    /**
     * Compare the given string, req.body.password,
     * with the given hash, the user's hashed password.
     */
    const isPasswordCorrect = await bcryptjs.compare(
      password,
      loginUser.password
    );

    if (!isPasswordCorrect) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ success: false, msg: 'Invalid password' });
    }

    /**
     * Return a JWT. The first argument is the payload, in this case an object containing
     * the authenticated user's id and role, the second argument is the secret,
     * our public/private key, and the third argument is the lifetime of the JWT.
     */
    const token = jwt.sign(
      {
        id: loginUser.id,
        role: loginUser.role,
      },
      JWT_SECRET,
      { expiresIn: JWT_LIFETIME }
    );

    return res.status(StatusCodes.OK).json({
      success: true,
      msg: `${loginUser.username} has successfully logged in`,
      token,
    });
  } catch (err) {
    /**
     * Don't return any software error information when a login fails for an unknown reason as this may expose
     * sensitive information.
     */
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
    });
  }
};

export interface RegisterBody {
  token: string;
}
interface LogoutRequest extends Request {
  body: RegisterBody;
}

/**
 * The logout function
 * @summary This function simply generates a new JWT with an immediate expiry to be written over the old JWT.
 * This approach does not remove the old JWT as this is not possible without changing the JWT secret or caching the token
 * somewhere and considering it valid only as long as it's cached. Neither of which are in the scope of this assignment.
 * @param req Request object
 * @param res Response object
 */
const logout = async (req: LogoutRequest, res: Response) => {
  try {
    const { token } = req.body;

    const decodedToken = jwt.verify(token, JWT_SECRET) as JWT;

    const newToken = jwt.sign(
      {
        id: decodedToken.id,
      },
      JWT_SECRET,
      { expiresIn: '1s' }
    );

    const loggedOutUser = await prisma?.user.findFirst({
      where: {
        id: decodedToken.id,
      },
    });

    return res.status(200).json({
      success: true,
      token: newToken,
      message: `${loggedOutUser?.username} has successfully logged out`,
    });
  } catch (err) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ success: false, msg: 'Not logged in' });
  }
};

export { register, login, logout, generateAvatar, wordToAvatar };
