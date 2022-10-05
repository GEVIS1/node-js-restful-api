import { z } from 'zod';
import { UserCreateWithoutScoresInputObjectSchema } from './UserCreateWithoutScoresInput.schema';
import { UserUncheckedCreateWithoutScoresInputObjectSchema } from './UserUncheckedCreateWithoutScoresInput.schema';
import { UserCreateOrConnectWithoutScoresInputObjectSchema } from './UserCreateOrConnectWithoutScoresInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreateNestedOneWithoutScoresInput> = z.union(
  [
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
        connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
      })
      .strict(),
  ]
);

export const UserCreateNestedOneWithoutScoresInputObjectSchema = Schema;
