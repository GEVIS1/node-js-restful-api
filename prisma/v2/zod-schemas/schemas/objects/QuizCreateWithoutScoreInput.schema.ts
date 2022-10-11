import { z } from 'zod';
import { DifficultySchema } from '../enums/Difficulty.schema';
import { QuestionCreateNestedManyWithoutQuizzesInputObjectSchema } from './QuestionCreateNestedManyWithoutQuizzesInput.schema';
import { UserCreateNestedOneWithoutQuizzesInputObjectSchema } from './UserCreateNestedOneWithoutQuizzesInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuizCreateWithoutScoreInput> = z
  .object({
    name: z.string(),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    difficulty: z.lazy(() => DifficultySchema),
    numberOfQuestions: z.number().optional(),
    questions: z
      .lazy(() => QuestionCreateNestedManyWithoutQuizzesInputObjectSchema)
      .optional(),
    winner: z
      .lazy(() => UserCreateNestedOneWithoutQuizzesInputObjectSchema)
      .optional(),
  })
  .strict();

export const QuizCreateWithoutScoreInputObjectSchema = Schema;
