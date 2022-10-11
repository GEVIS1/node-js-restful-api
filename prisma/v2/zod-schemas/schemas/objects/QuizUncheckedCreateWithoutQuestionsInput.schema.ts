import { z } from 'zod';
import { DifficultySchema } from '../enums/Difficulty.schema';
import { ScoreUncheckedCreateNestedManyWithoutQuizInputObjectSchema } from './ScoreUncheckedCreateNestedManyWithoutQuizInput.schema';
import { RatingUncheckedCreateNestedManyWithoutQuizInputObjectSchema } from './RatingUncheckedCreateNestedManyWithoutQuizInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuizUncheckedCreateWithoutQuestionsInput> = z
  .object({
    id: z.number().optional(),
    name: z.string(),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    difficulty: z.lazy(() => DifficultySchema),
    numberOfQuestions: z.number().optional(),
    userId: z.number().optional().nullable(),
    score: z
      .lazy(() => ScoreUncheckedCreateNestedManyWithoutQuizInputObjectSchema)
      .optional(),
    rating: z
      .lazy(() => RatingUncheckedCreateNestedManyWithoutQuizInputObjectSchema)
      .optional(),
  })
  .strict();

export const QuizUncheckedCreateWithoutQuestionsInputObjectSchema = Schema;
