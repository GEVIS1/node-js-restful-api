import { z } from 'zod';
import { UserCreateWithoutScoreInputObjectSchema } from './UserCreateWithoutScoreInput.schema';
import { UserUncheckedCreateWithoutScoreInputObjectSchema } from './UserUncheckedCreateWithoutScoreInput.schema';
import { UserCreateOrConnectWithoutScoreInputObjectSchema } from './UserCreateOrConnectWithoutScoreInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreateNestedOneWithoutScoreInput> = z.union([
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
      connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
    })
    .strict(),
]);

export const UserCreateNestedOneWithoutScoreInputObjectSchema = Schema;
