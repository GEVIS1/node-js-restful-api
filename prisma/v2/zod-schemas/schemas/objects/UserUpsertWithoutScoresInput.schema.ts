import { z } from 'zod';
import { UserUpdateWithoutScoresInputObjectSchema } from './UserUpdateWithoutScoresInput.schema';
import { UserUncheckedUpdateWithoutScoresInputObjectSchema } from './UserUncheckedUpdateWithoutScoresInput.schema';
import { UserCreateWithoutScoresInputObjectSchema } from './UserCreateWithoutScoresInput.schema';
import { UserUncheckedCreateWithoutScoresInputObjectSchema } from './UserUncheckedCreateWithoutScoresInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpsertWithoutScoresInput> = z
  .object({
    update: z.union([
      z.lazy(() => UserUpdateWithoutScoresInputObjectSchema),
      z.lazy(() => UserUncheckedUpdateWithoutScoresInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => UserCreateWithoutScoresInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutScoresInputObjectSchema),
    ]),
  })
  .strict();

export const UserUpsertWithoutScoresInputObjectSchema = Schema;
