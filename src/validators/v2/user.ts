import { Prisma } from '@prisma/client';
import { z } from 'zod';

// Input data with confirm, which doesn't exist in the prisma schema
type UserCreateInput = Prisma.UserUncheckedCreateInput & { confirm: string };

const createUserSchema = (data: UserCreateInput) => {
  return z.object({
    firstname: z.string().min(2).max(50),
    lastname: z.string().min(2).max(50),
    username: z.string().min(5).max(10),
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
      .regex(new RegExp(`${data.password}`), {
        message: 'Passwords did not match.',
      }),
    avatar: z.string().url(),
    role: z.literal('BASIC_USER').optional(),
  });
};

export { createUserSchema };
