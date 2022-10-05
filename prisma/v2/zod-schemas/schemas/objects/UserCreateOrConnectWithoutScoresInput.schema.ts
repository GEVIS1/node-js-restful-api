import { z } from 'zod';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutScoresInputObjectSchema } from './UserCreateWithoutScoresInput.schema';
import { UserUncheckedCreateWithoutScoresInputObjectSchema } from './UserUncheckedCreateWithoutScoresInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreateOrConnectWithoutScoresInput> = z
  .object({
    where: z.lazy(() => UserWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => UserCreateWithoutScoresInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutScoresInputObjectSchema),
    ]),
  })
  .strict();

export const UserCreateOrConnectWithoutScoresInputObjectSchema = Schema;
