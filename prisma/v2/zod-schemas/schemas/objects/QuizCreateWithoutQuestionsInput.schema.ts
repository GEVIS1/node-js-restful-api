import { z } from 'zod';
import { DifficultySchema } from '../enums/Difficulty.schema';
import { UserCreateNestedOneWithoutQuizzesInputObjectSchema } from './UserCreateNestedOneWithoutQuizzesInput.schema';
import { ScoreCreateNestedManyWithoutQuizInputObjectSchema } from './ScoreCreateNestedManyWithoutQuizInput.schema';

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
    Score: z
      .lazy(() => ScoreCreateNestedManyWithoutQuizInputObjectSchema)
      .optional(),
  })
  .strict();

export const QuizCreateWithoutQuestionsInputObjectSchema = Schema;
