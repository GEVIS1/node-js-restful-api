import { z } from 'zod';
import { UserCreateWithoutRatingInputObjectSchema } from './UserCreateWithoutRatingInput.schema';
import { UserUncheckedCreateWithoutRatingInputObjectSchema } from './UserUncheckedCreateWithoutRatingInput.schema';
import { UserCreateOrConnectWithoutRatingInputObjectSchema } from './UserCreateOrConnectWithoutRatingInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreateNestedOneWithoutRatingInput> = z.union(
  [
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
        connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
      })
      .strict(),
  ]
);

export const UserCreateNestedOneWithoutRatingInputObjectSchema = Schema;
