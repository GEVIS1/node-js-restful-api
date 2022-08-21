import { z } from 'zod';

export const RoleSchema = z.enum([
  'BASIC_USER',
  'ADMIN_USER',
  'SUPER_ADMIN_USER',
]);
