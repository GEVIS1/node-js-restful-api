import { z } from 'zod';
import { UserUpdateWithoutQuizInputObjectSchema } from './UserUpdateWithoutQuizInput.schema';
import { UserUncheckedUpdateWithoutQuizInputObjectSchema } from './UserUncheckedUpdateWithoutQuizInput.schema';
import { UserCreateWithoutQuizInputObjectSchema } from './UserCreateWithoutQuizInput.schema';
import { UserUncheckedCreateWithoutQuizInputObjectSchema } from './UserUncheckedCreateWithoutQuizInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpsertWithoutQuizInput> = z
  .object({
    update: z.union([
      z.lazy(() => UserUpdateWithoutQuizInputObjectSchema),
      z.lazy(() => UserUncheckedUpdateWithoutQuizInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => UserCreateWithoutQuizInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutQuizInputObjectSchema),
    ]),
  })
  .strict();

export const UserUpsertWithoutQuizInputObjectSchema = Schema;
