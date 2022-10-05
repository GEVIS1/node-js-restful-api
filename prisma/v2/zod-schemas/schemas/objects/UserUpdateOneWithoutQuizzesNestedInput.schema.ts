import { z } from 'zod';
import { UserCreateWithoutQuizzesInputObjectSchema } from './UserCreateWithoutQuizzesInput.schema';
import { UserUncheckedCreateWithoutQuizzesInputObjectSchema } from './UserUncheckedCreateWithoutQuizzesInput.schema';
import { UserCreateOrConnectWithoutQuizzesInputObjectSchema } from './UserCreateOrConnectWithoutQuizzesInput.schema';
import { UserUpsertWithoutQuizzesInputObjectSchema } from './UserUpsertWithoutQuizzesInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateWithoutQuizzesInputObjectSchema } from './UserUpdateWithoutQuizzesInput.schema';
import { UserUncheckedUpdateWithoutQuizzesInputObjectSchema } from './UserUncheckedUpdateWithoutQuizzesInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpdateOneWithoutQuizzesNestedInput> =
  z.union([
    z
      .object({
        create: z
          .union([
            z.lazy(() => UserCreateWithoutQuizzesInputObjectSchema),
            z.lazy(() => UserUncheckedCreateWithoutQuizzesInputObjectSchema),
          ])
          .optional(),
      })
      .strict(),
    z
      .object({
        connectOrCreate: z
          .lazy(() => UserCreateOrConnectWithoutQuizzesInputObjectSchema)
          .optional(),
      })
      .strict(),
    z
      .object({
        upsert: z
          .lazy(() => UserUpsertWithoutQuizzesInputObjectSchema)
          .optional(),
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
            z.lazy(() => UserUpdateWithoutQuizzesInputObjectSchema),
            z.lazy(() => UserUncheckedUpdateWithoutQuizzesInputObjectSchema),
          ])
          .optional(),
      })
      .strict(),
  ]);

export const UserUpdateOneWithoutQuizzesNestedInputObjectSchema = Schema;
