import { z } from 'zod';
import { QuizWhereUniqueInputObjectSchema } from './QuizWhereUniqueInput.schema';
import { QuizCreateWithoutRatingInputObjectSchema } from './QuizCreateWithoutRatingInput.schema';
import { QuizUncheckedCreateWithoutRatingInputObjectSchema } from './QuizUncheckedCreateWithoutRatingInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuizCreateOrConnectWithoutRatingInput> = z
  .object({
    where: z.lazy(() => QuizWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => QuizCreateWithoutRatingInputObjectSchema),
      z.lazy(() => QuizUncheckedCreateWithoutRatingInputObjectSchema),
    ]),
  })
  .strict();

export const QuizCreateOrConnectWithoutRatingInputObjectSchema = Schema;
