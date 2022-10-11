import { z } from 'zod';
import { UserUpdateWithoutRatingInputObjectSchema } from './UserUpdateWithoutRatingInput.schema';
import { UserUncheckedUpdateWithoutRatingInputObjectSchema } from './UserUncheckedUpdateWithoutRatingInput.schema';
import { UserCreateWithoutRatingInputObjectSchema } from './UserCreateWithoutRatingInput.schema';
import { UserUncheckedCreateWithoutRatingInputObjectSchema } from './UserUncheckedCreateWithoutRatingInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpsertWithoutRatingInput> = z
  .object({
    update: z.union([
      z.lazy(() => UserUpdateWithoutRatingInputObjectSchema),
      z.lazy(() => UserUncheckedUpdateWithoutRatingInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => UserCreateWithoutRatingInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutRatingInputObjectSchema),
    ]),
  })
  .strict();

export const UserUpsertWithoutRatingInputObjectSchema = Schema;
