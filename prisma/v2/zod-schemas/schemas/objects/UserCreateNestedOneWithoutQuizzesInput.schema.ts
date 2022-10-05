import { z } from 'zod';
import { UserCreateWithoutQuizzesInputObjectSchema } from './UserCreateWithoutQuizzesInput.schema';
import { UserUncheckedCreateWithoutQuizzesInputObjectSchema } from './UserUncheckedCreateWithoutQuizzesInput.schema';
import { UserCreateOrConnectWithoutQuizzesInputObjectSchema } from './UserCreateOrConnectWithoutQuizzesInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreateNestedOneWithoutQuizzesInput> =
  z.union([
    z
      .object({
        create: z
          .union([
            z.lazy(() => UserCreateWithoutQuizzesInputObjectSchema),
            z.lazy(() => UserUncheckedCreateWithoutQuizzesInputObjectSchema),
          ])
          .optional(),
      })
      .strict(),
    z
      .object({
        connectOrCreate: z
          .lazy(() => UserCreateOrConnectWithoutQuizzesInputObjectSchema)
          .optional(),
      })
      .strict(),
    z
      .object({
        connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
      })
      .strict(),
  ]);

export const UserCreateNestedOneWithoutQuizzesInputObjectSchema = Schema;
