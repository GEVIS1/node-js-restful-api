import { z } from 'zod';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutQuizInputObjectSchema } from './UserCreateWithoutQuizInput.schema';
import { UserUncheckedCreateWithoutQuizInputObjectSchema } from './UserUncheckedCreateWithoutQuizInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreateOrConnectWithoutQuizInput> = z
  .object({
    where: z.lazy(() => UserWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => UserCreateWithoutQuizInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutQuizInputObjectSchema),
    ]),
  })
  .strict();

export const UserCreateOrConnectWithoutQuizInputObjectSchema = Schema;
