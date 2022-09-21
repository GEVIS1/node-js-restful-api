// We want console logs in this file since it's a CLI program that needs to report directly to the user
/* eslint-disable no-console */

import bcryptjs from 'bcryptjs';

import superAdminUsers from './users';
import { prisma } from '../../../src/utils/v2/prisma/prisma';
import {
  createUserSchema,
  UserCreateInput,
  UserValidatedInput,
} from '../../../src/validators/v2/user';
import { generateAvatar } from '../../../src/controllers/v2/auth';
import { UserCreateOneSchema } from '../zod-schemas/schemas/createOneUser.schema';

const User = prisma.user;
const seed = async () => {
  try {
    const data = superAdminUsers.map((user) => {
      // Generate necessary additional data
      const avatar = generateAvatar();
      const userWithAvatar = { ...user, avatar };
      const salt = bcryptjs.genSaltSync();
      const hashedPassword = bcryptjs.hashSync(userWithAvatar.password, salt);

      // Validate data
      const SuperAdminUserSchema = createUserSchema(
        userWithAvatar as UserCreateInput,
        'SUPER_ADMIN_USER'
      );
      const validatedUserExtended = {
        data: SuperAdminUserSchema.parse(userWithAvatar) as UserValidatedInput,
      };
      delete validatedUserExtended.data.confirm;
      const validatedUser = UserCreateOneSchema.parse(
        validatedUserExtended
      ).data;

      // Replace password with hash
      validatedUser.password = hashedPassword;

      return validatedUser;
    });

    // Delete old super users if they exist
    const deleteResult = await User.deleteMany({
      where: { role: 'SUPER_ADMIN_USER' },
    });

    if (deleteResult.count > 0) {
      console.log(`Deleted ${deleteResult.count} old super admin users.`);
    }

    const result = await User.createMany({ data });
    const resultData = await User.findMany({
      where: { role: 'SUPER_ADMIN_USER' },
    });

    if (result.count !== resultData.length) {
      throw Error('Did not successfully insert all super admin users');
    } else {
      // Let's print the resulting data in the console
      resultData.forEach((user) => {
        console.table(user);
      });
    }
  } catch (err) {
    console.log(err);
  }
};

seed();
