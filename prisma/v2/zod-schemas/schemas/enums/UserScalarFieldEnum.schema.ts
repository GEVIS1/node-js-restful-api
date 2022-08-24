import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum([
  'id',
  'firstname',
  'lastname',
  'username',
  'email',
  'password',
  'avatar',
  'role',
  'createdAt',
]);
