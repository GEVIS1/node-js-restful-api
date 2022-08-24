import { z } from 'zod';

const UserSchema = z.object({
  firstname: z.string().min(2).max(50),
  lastname: z.string().min(2).max(50),
  username: z.string().min(5).max(10),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .max(16)
    .regex(/.*([a-z][0-9]|[0-9][a-z]).*/),
  confirm: z
    .string()
    .min(8)
    .max(16)
    .regex(/.*([a-z][0-9]|[0-9][a-z]).*/),
  avatar: z.string().url(),
});

export { UserSchema };
