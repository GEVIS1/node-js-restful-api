import { z } from 'zod';
import { QuizCreateWithoutRatingInputObjectSchema } from './QuizCreateWithoutRatingInput.schema';
import { QuizUncheckedCreateWithoutRatingInputObjectSchema } from './QuizUncheckedCreateWithoutRatingInput.schema';
import { QuizCreateOrConnectWithoutRatingInputObjectSchema } from './QuizCreateOrConnectWithoutRatingInput.schema';
import { QuizWhereUniqueInputObjectSchema } from './QuizWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuizCreateNestedOneWithoutRatingInput> = z.union(
  [
    z
      .object({
        create: z
          .union([
            z.lazy(() => QuizCreateWithoutRatingInputObjectSchema),
            z.lazy(() => QuizUncheckedCreateWithoutRatingInputObjectSchema),
          ])
          .optional(),
      })
      .strict(),
    z
      .object({
        connectOrCreate: z
          .lazy(() => QuizCreateOrConnectWithoutRatingInputObjectSchema)
          .optional(),
      })
      .strict(),
    z
      .object({
        connect: z.lazy(() => QuizWhereUniqueInputObjectSchema).optional(),
      })
      .strict(),
  ]
);

export const QuizCreateNestedOneWithoutRatingInputObjectSchema = Schema;
