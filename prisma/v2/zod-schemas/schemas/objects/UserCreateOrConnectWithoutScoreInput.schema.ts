import { z } from 'zod';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutScoreInputObjectSchema } from './UserCreateWithoutScoreInput.schema';
import { UserUncheckedCreateWithoutScoreInputObjectSchema } from './UserUncheckedCreateWithoutScoreInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreateOrConnectWithoutScoreInput> = z
  .object({
    where: z.lazy(() => UserWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => UserCreateWithoutScoreInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutScoreInputObjectSchema),
    ]),
  })
  .strict();

export const UserCreateOrConnectWithoutScoreInputObjectSchema = Schema;
