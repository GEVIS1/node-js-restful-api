import { z } from 'zod';
import { QuizCreateNestedOneWithoutRatingInputObjectSchema } from './QuizCreateNestedOneWithoutRatingInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RatingCreateWithoutUserInput> = z
  .object({
    quiz: z.lazy(() => QuizCreateNestedOneWithoutRatingInputObjectSchema),
    rating: z.number(),
  })
  .strict();

export const RatingCreateWithoutUserInputObjectSchema = Schema;
