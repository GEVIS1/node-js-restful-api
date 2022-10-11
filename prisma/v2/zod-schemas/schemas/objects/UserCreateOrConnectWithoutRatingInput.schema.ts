import { z } from 'zod';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutRatingInputObjectSchema } from './UserCreateWithoutRatingInput.schema';
import { UserUncheckedCreateWithoutRatingInputObjectSchema } from './UserUncheckedCreateWithoutRatingInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreateOrConnectWithoutRatingInput> = z
  .object({
    where: z.lazy(() => UserWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => UserCreateWithoutRatingInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutRatingInputObjectSchema),
    ]),
  })
  .strict();

export const UserCreateOrConnectWithoutRatingInputObjectSchema = Schema;
