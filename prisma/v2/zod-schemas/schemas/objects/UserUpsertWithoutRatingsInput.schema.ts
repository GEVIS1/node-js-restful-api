import { z } from 'zod';
import { UserUpdateWithoutRatingsInputObjectSchema } from './UserUpdateWithoutRatingsInput.schema';
import { UserUncheckedUpdateWithoutRatingsInputObjectSchema } from './UserUncheckedUpdateWithoutRatingsInput.schema';
import { UserCreateWithoutRatingsInputObjectSchema } from './UserCreateWithoutRatingsInput.schema';
import { UserUncheckedCreateWithoutRatingsInputObjectSchema } from './UserUncheckedCreateWithoutRatingsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpsertWithoutRatingsInput> = z
  .object({
    update: z.union([
      z.lazy(() => UserUpdateWithoutRatingsInputObjectSchema),
      z.lazy(() => UserUncheckedUpdateWithoutRatingsInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => UserCreateWithoutRatingsInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutRatingsInputObjectSchema),
    ]),
  })
  .strict();

export const UserUpsertWithoutRatingsInputObjectSchema = Schema;
