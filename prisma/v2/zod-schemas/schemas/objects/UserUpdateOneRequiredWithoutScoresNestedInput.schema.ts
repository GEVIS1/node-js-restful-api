import { z } from 'zod';
import { UserCreateWithoutScoresInputObjectSchema } from './UserCreateWithoutScoresInput.schema';
import { UserUncheckedCreateWithoutScoresInputObjectSchema } from './UserUncheckedCreateWithoutScoresInput.schema';
import { UserCreateOrConnectWithoutScoresInputObjectSchema } from './UserCreateOrConnectWithoutScoresInput.schema';
import { UserUpsertWithoutScoresInputObjectSchema } from './UserUpsertWithoutScoresInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateWithoutScoresInputObjectSchema } from './UserUpdateWithoutScoresInput.schema';
import { UserUncheckedUpdateWithoutScoresInputObjectSchema } from './UserUncheckedUpdateWithoutScoresInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutScoresNestedInput> =
  z.union([
    z
      .object({
        create: z
          .union([
            z.lazy(() => UserCreateWithoutScoresInputObjectSchema),
            z.lazy(() => UserUncheckedCreateWithoutScoresInputObjectSchema),
          ])
          .optional(),
      })
      .strict(),
    z
      .object({
        connectOrCreate: z
          .lazy(() => UserCreateOrConnectWithoutScoresInputObjectSchema)
          .optional(),
      })
      .strict(),
    z
      .object({
        upsert: z
          .lazy(() => UserUpsertWithoutScoresInputObjectSchema)
          .optional(),
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
            z.lazy(() => UserUpdateWithoutScoresInputObjectSchema),
            z.lazy(() => UserUncheckedUpdateWithoutScoresInputObjectSchema),
          ])
          .optional(),
      })
      .strict(),
  ]);

export const UserUpdateOneRequiredWithoutScoresNestedInputObjectSchema = Schema;
