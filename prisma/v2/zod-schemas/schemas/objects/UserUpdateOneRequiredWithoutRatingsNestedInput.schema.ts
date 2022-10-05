import { z } from 'zod';
import { UserCreateWithoutRatingsInputObjectSchema } from './UserCreateWithoutRatingsInput.schema';
import { UserUncheckedCreateWithoutRatingsInputObjectSchema } from './UserUncheckedCreateWithoutRatingsInput.schema';
import { UserCreateOrConnectWithoutRatingsInputObjectSchema } from './UserCreateOrConnectWithoutRatingsInput.schema';
import { UserUpsertWithoutRatingsInputObjectSchema } from './UserUpsertWithoutRatingsInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateWithoutRatingsInputObjectSchema } from './UserUpdateWithoutRatingsInput.schema';
import { UserUncheckedUpdateWithoutRatingsInputObjectSchema } from './UserUncheckedUpdateWithoutRatingsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutRatingsNestedInput> =
  z.union([
    z
      .object({
        create: z
          .union([
            z.lazy(() => UserCreateWithoutRatingsInputObjectSchema),
            z.lazy(() => UserUncheckedCreateWithoutRatingsInputObjectSchema),
          ])
          .optional(),
      })
      .strict(),
    z
      .object({
        connectOrCreate: z
          .lazy(() => UserCreateOrConnectWithoutRatingsInputObjectSchema)
          .optional(),
      })
      .strict(),
    z
      .object({
        upsert: z
          .lazy(() => UserUpsertWithoutRatingsInputObjectSchema)
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
            z.lazy(() => UserUpdateWithoutRatingsInputObjectSchema),
            z.lazy(() => UserUncheckedUpdateWithoutRatingsInputObjectSchema),
          ])
          .optional(),
      })
      .strict(),
  ]);

export const UserUpdateOneRequiredWithoutRatingsNestedInputObjectSchema =
  Schema;
