import { z } from 'zod';
import { UserCreateWithoutQuizInputObjectSchema } from './UserCreateWithoutQuizInput.schema';
import { UserUncheckedCreateWithoutQuizInputObjectSchema } from './UserUncheckedCreateWithoutQuizInput.schema';
import { UserCreateOrConnectWithoutQuizInputObjectSchema } from './UserCreateOrConnectWithoutQuizInput.schema';
import { UserUpsertWithoutQuizInputObjectSchema } from './UserUpsertWithoutQuizInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateWithoutQuizInputObjectSchema } from './UserUpdateWithoutQuizInput.schema';
import { UserUncheckedUpdateWithoutQuizInputObjectSchema } from './UserUncheckedUpdateWithoutQuizInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpdateOneWithoutQuizNestedInput> = z.union([
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
      upsert: z.lazy(() => UserUpsertWithoutQuizInputObjectSchema).optional(),
    })
    .strict(),
  z
    .object({
      disconnect: z.boolean().optional(),
    })
    .strict(),
  z
    .object({
      delete: z.boolean().optional(),
    })
    .strict(),
  z
    .object({
      connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
    })
    .strict(),
  z
    .object({
      update: z
        .union([
          z.lazy(() => UserUpdateWithoutQuizInputObjectSchema),
          z.lazy(() => UserUncheckedUpdateWithoutQuizInputObjectSchema),
        ])
        .optional(),
    })
    .strict(),
]);

export const UserUpdateOneWithoutQuizNestedInputObjectSchema = Schema;
