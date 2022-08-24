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
//import { User } from '@prisma/client';
//import { z } from 'zod';

//import { UserCreateOneSchema } from '../../../prisma/v2/zod-schemas/schemas/createOneUser.schema'
//import prisma from '../../utils/v2/prisma/prisma'
import { UserSchema } from '../../validators/v2/user';
import { getAvatar } from '../../utils/v2/axios';

const register = async (req: Request, res: Response) => {
  try {
    // Check that passwords are identical
    if (req.body.password !== req.body.confirm)
      throw Error('Passwords do not match!');

    // Grab avatar
    const fetchedAvatar = await getAvatar(`${uuid()}.svg`);

    // Validate extended rules
    UserSchema.parse({ ...req.body, avatar: fetchedAvatar });

    // Validate that the data fits the schema and save the return object
    //const userData = UserCreateOneSchema.parse(req.body);

    //const regex = new RegExp(`^${req.body.username}@.*`)

    if (!req.body.email.startsWith(req.body.username)) throw Error('derp');

    // Confirm that the user portion of the email is identical to the username
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

export { register };
