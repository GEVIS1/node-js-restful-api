import { z } from 'zod';
import { QuizUpdateWithoutRatingInputObjectSchema } from './QuizUpdateWithoutRatingInput.schema';
import { QuizUncheckedUpdateWithoutRatingInputObjectSchema } from './QuizUncheckedUpdateWithoutRatingInput.schema';
import { QuizCreateWithoutRatingInputObjectSchema } from './QuizCreateWithoutRatingInput.schema';
import { QuizUncheckedCreateWithoutRatingInputObjectSchema } from './QuizUncheckedCreateWithoutRatingInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuizUpsertWithoutRatingInput> = z
  .object({
    update: z.union([
      z.lazy(() => QuizUpdateWithoutRatingInputObjectSchema),
      z.lazy(() => QuizUncheckedUpdateWithoutRatingInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => QuizCreateWithoutRatingInputObjectSchema),
      z.lazy(() => QuizUncheckedCreateWithoutRatingInputObjectSchema),
    ]),
  })
  .strict();

export const QuizUpsertWithoutRatingInputObjectSchema = Schema;
