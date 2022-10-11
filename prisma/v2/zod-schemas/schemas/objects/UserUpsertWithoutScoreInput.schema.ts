import { z } from 'zod';
import { UserUpdateWithoutScoreInputObjectSchema } from './UserUpdateWithoutScoreInput.schema';
import { UserUncheckedUpdateWithoutScoreInputObjectSchema } from './UserUncheckedUpdateWithoutScoreInput.schema';
import { UserCreateWithoutScoreInputObjectSchema } from './UserCreateWithoutScoreInput.schema';
import { UserUncheckedCreateWithoutScoreInputObjectSchema } from './UserUncheckedCreateWithoutScoreInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpsertWithoutScoreInput> = z
  .object({
    update: z.union([
      z.lazy(() => UserUpdateWithoutScoreInputObjectSchema),
      z.lazy(() => UserUncheckedUpdateWithoutScoreInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => UserCreateWithoutScoreInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutScoreInputObjectSchema),
    ]),
  })
  .strict();

export const UserUpsertWithoutScoreInputObjectSchema = Schema;
