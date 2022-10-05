/**
 * The validator functions/schemas for user data.
 * When this was first written I was unsure how to validate two fields together, because what I knew from joi was that you can
 * refer to another field in the same object and compare them, but I could not find this functionality in zod. I have now realized
 * this is because there is a more powerful functionality that easily allows you to do anything with any data in the object.
 * Link here: https://github.com/colinhacks/zod#customize-error-path
 * I definitely would implement it like this in the future.
 */

import { Prisma, Role } from '@prisma/client';
import { z, ZodString } from 'zod';

// Input data with confirm, which doesn't exist in the prisma schema
export type UserCreateInput = Prisma.UserUncheckedCreateInput & {
  confirm: string;
};

// Data with deletable confirm
export type UserValidatedInput = Prisma.UserCreateInput & { confirm?: string };

/**
 * User passwords are allowed to use regex special characters, so we need to escape them.
 * This function will replace all regex special characters and prefix them with a backslash.
 * $& being the matched substring and \\ being a literal backslash '\'
 * E.G: escapeRegex('super*man') => 'super\*man'
 * Since * means match zero or any amount of the preceeding character, which we don't want.
 * This would match "supeman" and "superrrrrrrrrrrrrrrrrrrman" and any amount of 'r's rather
 * than the literal string super*man.
 * Source: https://stackoverflow.com/a/3561711
 */
const escapeRegex = (string: string) =>
  string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

/**
 * Creates a user schema fitting the user data input and the desired role
 * @param data The user data to be verified
 * @param userRole The desired role to lock this schema to
 * @returns A user schema validator that can confirm passwords and roles dynamically
 */
const createUserSchema = (data: UserCreateInput, userRole: Role) => {
  return z.object({
    firstname: z
      .string()
      .min(2)
      .max(50)
      .regex(/^[a-zA-Z]*$/, {
        message: 'Only alpha characters allowed',
      }),
    lastname: z
      .string()
      .min(2)
      .max(50)
      .regex(/^[a-zA-Z]*$/, {
        message: 'Only alpha characters allowed',
      }),
    username: z
      .string()
      .min(5)
      .max(10)
      .regex(/^[a-zA-Z0-9]*$/, {
        message: 'Only alphanumeric characters allowed',
      }),
    email: z
      .string()
      .email()
      .startsWith(data.username, {
        message: `The Local-part of the email address must match username. I.E: ${
          data.username
        }@${data.email.split('@')[1]}`,
      }),
    password: z
      .string()
      .min(8)
      .max(16)
      .regex(/.*([^a-zA-Z0-9\t\n\r ].*[0-9]|[0-9].*[^a-zA-Z0-9\t\n\r ]).*/, {
        message:
          'The password must contain at least one number and at least one special character.',
      }),
    confirm: z
      .string()
      .min(8)
      .max(16)
      .regex(new RegExp(`${escapeRegex(data.password)}`), {
        message: 'Passwords did not match.',
      }),
    avatar: z.string().url(),
    role: z.literal(userRole).optional(),
  });
};

/**
 * Creates a user schema fitting the user data for updating a user
 * @param data The user data to be verified
 * @returns A user schema validator that can confirm passwords
 */
const createUpdateUserSchema = (data: UserCreateInput) => {
  const schema: {
    firstname?: ZodString;
    lastname?: ZodString;
    username?: ZodString;
    email?: ZodString;
    password?: ZodString;
    confirm?: ZodString;
    avatar?: ZodString;
  } = {};

  /**
   * Conditionally adding tests to schema based on input data
   */
  if (data.firstname)
    schema.firstname = z
      .string()
      .min(2)
      .max(50)
      .regex(/^[a-zA-Z]*$/, {
        message: 'Only alpha characters allowed',
      });

  if (data.lastname)
    schema.lastname = z
      .string()
      .min(2)
      .max(50)
      .regex(/^[a-zA-Z]*$/, {
        message: 'Only alpha characters allowed',
      });

  /**
   * If we have a username or an email, we need to check both, as they are dependant on each other
   */
  if (data.username || data.email) {
    schema.username = z
      .string()
      .min(5)
      .max(10)
      .regex(/^[a-zA-Z0-9]*$/, {
        message: 'Only alphanumeric characters allowed',
      });

    schema.email = z
      .string()
      .email()
      .startsWith(data.username, {
        message: `The Local-part of the email address must match username. I.E: ${
          data.username
        }@${data.email?.split('@')[1]}`,
      });
  }

  /**
   * If the password is being updated we have to check the confirm
   */
  if (data.password) {
    schema.password = z
      .string()
      .min(8)
      .max(16)
      .regex(/.*([^a-zA-Z0-9\t\n\r ].*[0-9]|[0-9].*[^a-zA-Z0-9\t\n\r ]).*/, {
        message:
          'The password must contain at least one number and at least one special character.',
      });
    schema.confirm = z
      .string()
      .min(8)
      .max(16)
      .regex(new RegExp(`${escapeRegex(data.password)}`), {
        message: 'Passwords did not match.',
      });
  }

  if (data.avatar) schema.avatar = z.string().url();

  return z.object(schema);
};

export { createUserSchema, createUpdateUserSchema };
