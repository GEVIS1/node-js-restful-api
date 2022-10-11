import { z } from 'zod';
import { QuizCreateWithoutScoreInputObjectSchema } from './QuizCreateWithoutScoreInput.schema';
import { QuizUncheckedCreateWithoutScoreInputObjectSchema } from './QuizUncheckedCreateWithoutScoreInput.schema';
import { QuizCreateOrConnectWithoutScoreInputObjectSchema } from './QuizCreateOrConnectWithoutScoreInput.schema';
import { QuizWhereUniqueInputObjectSchema } from './QuizWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuizCreateNestedOneWithoutScoreInput> = z.union([
  z
    .object({
      create: z
        .union([
          z.lazy(() => QuizCreateWithoutScoreInputObjectSchema),
          z.lazy(() => QuizUncheckedCreateWithoutScoreInputObjectSchema),
        ])
        .optional(),
    })
    .strict(),
  z
    .object({
      connectOrCreate: z
        .lazy(() => QuizCreateOrConnectWithoutScoreInputObjectSchema)
        .optional(),
    })
    .strict(),
  z
    .object({
      connect: z.lazy(() => QuizWhereUniqueInputObjectSchema).optional(),
    })
    .strict(),
]);

export const QuizCreateNestedOneWithoutScoreInputObjectSchema = Schema;
