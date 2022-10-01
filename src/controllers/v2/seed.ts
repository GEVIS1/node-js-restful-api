import axios from 'axios';
import bcryptjs from 'bcryptjs';
import { Optional } from 'utility-types';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Prisma, Role } from '@prisma/client';

import {
  createUserSchema,
  UserCreateInput,
  UserValidatedInput,
} from '../../validators/v2/user';
import { prisma } from '../../utils/v2/prisma/prisma';
import { UserCreateOneSchema } from '../../../prisma/v2/zod-schemas/schemas/createOneUser.schema';
import { AuthorizedRequest } from '../../middleware/v2/authorization/authRoute';
import { wordToAvatar } from './auth';

const authorizedRoles = ['SUPER_ADMIN_USER'];

const createSeeder =
  (gistURL: string, role: Role) =>
  async (req: AuthorizedRequest, res: Response) => {
    try {
      const token = req.user;

      if (token === undefined) {
        throw Error('Unauthorized');
      }

      // Get the user data to verify they have permission
      const authorizedUser = await prisma.user.findFirst({
        where: { id: token.id },
      });

      // Return a 403 if not found, or is not of authorized role
      if (
        authorizedUser !== null &&
          !authorizedRoles.includes(authorizedUser.role) ||
        authorizedUser === null
      ) {
        return res
          .status(StatusCodes.FORBIDDEN)
          .json({ success: false, error: 'Not authorized to use this route' });
      }

      const basicUsers = (await axios.get<UserCreateInput[]>(gistURL)).data;

      // Verify all accounts with the extended rules before inserting
      const userData = basicUsers.map((user) => {
        // Generate the avatar URL
        user.avatar = wordToAvatar(user.avatar);

        // Create the validation schema for this basic user
        const UserSchema = createUserSchema(user, role);

        // Validate the data for our extended rules
        const validData: UserValidatedInput = UserSchema.parse(user);

        // Async map functions are tricky, so generate passwords synchronously
        const salt = bcryptjs.genSaltSync();
        validData.password = bcryptjs.hashSync(validData.password, salt);

        // Delete confirm property
        delete validData.confirm;

        // Validate the prisma schema
        const schemaData = UserCreateOneSchema.parse({ data: validData });

        return schemaData;
      });

      // Map the array into the UserCreateManyArgs type
      const data: Prisma.UserCreateManyArgs = {
        data: userData.map(
          (d) => d.data
        ) as Prisma.Enumerable<Prisma.UserCreateManyInput>,
      };

      // Insert the validated data
      const result = await prisma.user.createMany(data);

      // If we don't get a result, or the result count isn't the same as the userData length something went wrong.
      if (!result || result.count !== userData.length) {
        throw Error(
          `Could not insert data properly. Expected to create ${userData.length} new documents, but only created ${result.count}.`
        );
      }

      // Strip the password from the data before returning it
      // eslint-disable-next-line no-extra-parens
      const resData = (basicUsers as UserCreateInput[]).map(
        (basicUser: Optional<UserCreateInput, 'password'>) => {
          delete basicUser.password;
          return basicUser;
        }
      );

      return res
        .status(StatusCodes.CREATED)
        .json({ success: true, data: resData });
    } catch (err) {
      if (err instanceof Error && err.message === 'Unauthorized') {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ success: false, error: 'Unauthorized' });
      } else if (err instanceof Error) {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ success: false, error: err.message });
      } else {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ success: false });
      }
    }
  };

export { createSeeder };
