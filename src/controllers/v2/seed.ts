import { prisma } from '../../utils/v2/prisma/prisma';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import axios from 'axios';
import { Prisma } from '@prisma/client';
import {
  createUserSchema,
  UserCreateInput,
  UserValidatedInput,
} from '../../validators/v2/user';
import { Optional } from 'utility-types';
import { UserCreateOneSchema } from '../../../prisma/v2/zod-schemas/schemas/createOneUser.schema';

//const authorizedRoles = ['SUPER_ADMIN_USER'];

export interface AuthorizedRequest extends Request {
  /**
   * Make user optional as a workaround with TypeScript.
   * The other option would be to overwrite the Request object and add
   * a user property to all Request objects, which is objectively wrong since
   * some requests will not use the authorization middleware and will not have
   * the user property present.
   *
   * Source: https://stackoverflow.com/questions/44383387/typescript-error-property-user-does-not-exist-on-type-request
   */
  user?: JwtPayload;
}

const seed = async (req: AuthorizedRequest, res: Response) => {
  try {
    //const token = req.user;

    // if (token === undefined) {
    //   throw Error('Unauthorized');
    // }

    // // Get the user data to verify they have permission
    // const user = await prisma.user.findFirst({ where: { id: token.id } });

    // // Fail if user is not found, or is not of authorized role
    // if (
    //   user !== null && !authorizedRoles.includes(user.role) ||
    //   user === null
    // ) {
    //   throw Error('Unauthorized');
    // }

    if (!process.env.ADMIN_USER_GIST) {
      throw Error('No ADMIN_USER_GIST url set in app environment');
    }

    const adminUsers = await (
      await axios.get<UserCreateInput[]>(process.env.ADMIN_USER_GIST)
    ).data;

    // Verify all accounts with the extended rules before inserting
    // eslint-disable-next-line no-extra-parens
    const userData = adminUsers.map((admin) => {
      // Create the validation schema for this admin user
      const AdminUserSchema = createUserSchema(admin, 'ADMIN_USER');

      // Validate the data for our extended rules
      const validData: UserValidatedInput = AdminUserSchema.parse(admin);

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

    // Delete old admin user accounts
    await prisma.user.deleteMany({ where: { role: 'ADMIN_USER' } });

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
    const resData = (adminUsers as UserCreateInput[]).map(
      (admin: Optional<UserCreateInput, 'password'>) => {
        delete admin.password;
        return admin;
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

export default seed;
