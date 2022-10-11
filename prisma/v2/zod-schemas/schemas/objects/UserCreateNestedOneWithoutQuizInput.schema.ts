import { z } from 'zod';
import { UserCreateWithoutQuizInputObjectSchema } from './UserCreateWithoutQuizInput.schema';
import { UserUncheckedCreateWithoutQuizInputObjectSchema } from './UserUncheckedCreateWithoutQuizInput.schema';
import { UserCreateOrConnectWithoutQuizInputObjectSchema } from './UserCreateOrConnectWithoutQuizInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreateNestedOneWithoutQuizInput> = z.union([
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutQuizInputObjectSchema),
          z.lazy(() => UserUncheckedCreateWithoutQuizInputObjectSchema),
        ])
        .optional(),
    })
    .strict(),
  z
    .object({
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutQuizInputObjectSchema)
        .optional(),
    })
    .strict(),
  z
    .object({
      connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
    })
    .strict(),
]);

export const UserCreateNestedOneWithoutQuizInputObjectSchema = Schema;
