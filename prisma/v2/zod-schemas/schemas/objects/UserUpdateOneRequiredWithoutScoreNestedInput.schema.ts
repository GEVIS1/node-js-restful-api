import { z } from 'zod';
import { UserCreateWithoutScoreInputObjectSchema } from './UserCreateWithoutScoreInput.schema';
import { UserUncheckedCreateWithoutScoreInputObjectSchema } from './UserUncheckedCreateWithoutScoreInput.schema';
import { UserCreateOrConnectWithoutScoreInputObjectSchema } from './UserCreateOrConnectWithoutScoreInput.schema';
import { UserUpsertWithoutScoreInputObjectSchema } from './UserUpsertWithoutScoreInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateWithoutScoreInputObjectSchema } from './UserUpdateWithoutScoreInput.schema';
import { UserUncheckedUpdateWithoutScoreInputObjectSchema } from './UserUncheckedUpdateWithoutScoreInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutScoreNestedInput> =
  z.union([
    z
      .object({
        create: z
          .union([
            z.lazy(() => UserCreateWithoutScoreInputObjectSchema),
            z.lazy(() => UserUncheckedCreateWithoutScoreInputObjectSchema),
          ])
          .optional(),
      })
      .strict(),
    z
      .object({
        connectOrCreate: z
          .lazy(() => UserCreateOrConnectWithoutScoreInputObjectSchema)
          .optional(),
      })
      .strict(),
    z
      .object({
        upsert: z
          .lazy(() => UserUpsertWithoutScoreInputObjectSchema)
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
            z.lazy(() => UserUpdateWithoutScoreInputObjectSchema),
            z.lazy(() => UserUncheckedUpdateWithoutScoreInputObjectSchema),
          ])
          .optional(),
      })
      .strict(),
  ]);

export const UserUpdateOneRequiredWithoutScoreNestedInputObjectSchema = Schema;
