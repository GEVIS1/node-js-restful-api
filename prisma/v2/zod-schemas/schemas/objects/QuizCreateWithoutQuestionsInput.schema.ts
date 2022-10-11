import { z } from 'zod';
import { DifficultySchema } from '../enums/Difficulty.schema';
import { UserCreateNestedOneWithoutQuizzesInputObjectSchema } from './UserCreateNestedOneWithoutQuizzesInput.schema';
import { ScoreCreateNestedManyWithoutQuizInputObjectSchema } from './ScoreCreateNestedManyWithoutQuizInput.schema';
import { RatingCreateNestedManyWithoutQuizInputObjectSchema } from './RatingCreateNestedManyWithoutQuizInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuizCreateWithoutQuestionsInput> = z
  .object({
    name: z.string(),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    difficulty: z.lazy(() => DifficultySchema),
    numberOfQuestions: z.number().optional(),
    winner: z
      .lazy(() => UserCreateNestedOneWithoutQuizzesInputObjectSchema)
      .optional(),
    score: z
      .lazy(() => ScoreCreateNestedManyWithoutQuizInputObjectSchema)
      .optional(),
    rating: z
      .lazy(() => RatingCreateNestedManyWithoutQuizInputObjectSchema)
      .optional(),
  })
  .strict();

export const QuizCreateWithoutQuestionsInputObjectSchema = Schema;
