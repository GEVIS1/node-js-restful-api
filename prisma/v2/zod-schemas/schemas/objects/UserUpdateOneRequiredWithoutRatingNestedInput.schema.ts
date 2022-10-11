import { z } from 'zod';
import { UserCreateWithoutRatingInputObjectSchema } from './UserCreateWithoutRatingInput.schema';
import { UserUncheckedCreateWithoutRatingInputObjectSchema } from './UserUncheckedCreateWithoutRatingInput.schema';
import { UserCreateOrConnectWithoutRatingInputObjectSchema } from './UserCreateOrConnectWithoutRatingInput.schema';
import { UserUpsertWithoutRatingInputObjectSchema } from './UserUpsertWithoutRatingInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateWithoutRatingInputObjectSchema } from './UserUpdateWithoutRatingInput.schema';
import { UserUncheckedUpdateWithoutRatingInputObjectSchema } from './UserUncheckedUpdateWithoutRatingInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutRatingNestedInput> =
  z.union([
    z
      .object({
        create: z
          .union([
            z.lazy(() => UserCreateWithoutRatingInputObjectSchema),
            z.lazy(() => UserUncheckedCreateWithoutRatingInputObjectSchema),
          ])
          .optional(),
      })
      .strict(),
    z
      .object({
        connectOrCreate: z
          .lazy(() => UserCreateOrConnectWithoutRatingInputObjectSchema)
          .optional(),
      })
      .strict(),
    z
      .object({
        upsert: z
          .lazy(() => UserUpsertWithoutRatingInputObjectSchema)
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
            z.lazy(() => UserUpdateWithoutRatingInputObjectSchema),
            z.lazy(() => UserUncheckedUpdateWithoutRatingInputObjectSchema),
          ])
          .optional(),
      })
      .strict(),
  ]);

export const UserUpdateOneRequiredWithoutRatingNestedInputObjectSchema = Schema;
