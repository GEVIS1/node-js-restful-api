import { z } from 'zod';
import { UserCreateNestedOneWithoutRatingsInputObjectSchema } from './UserCreateNestedOneWithoutRatingsInput.schema';
import { QuizCreateNestedOneWithoutRatingInputObjectSchema } from './QuizCreateNestedOneWithoutRatingInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RatingCreateInput> = z
  .object({
    user: z.lazy(() => UserCreateNestedOneWithoutRatingsInputObjectSchema),
    quiz: z.lazy(() => QuizCreateNestedOneWithoutRatingInputObjectSchema),
    rating: z.number(),
  })
  .strict();

export const RatingCreateInputObjectSchema = Schema;
