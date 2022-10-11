import { z } from 'zod';
import { DifficultySchema } from '../enums/Difficulty.schema';
import { QuestionCreateNestedManyWithoutQuizzesInputObjectSchema } from './QuestionCreateNestedManyWithoutQuizzesInput.schema';
import { ScoreCreateNestedManyWithoutQuizInputObjectSchema } from './ScoreCreateNestedManyWithoutQuizInput.schema';
import { RatingCreateNestedManyWithoutQuizInputObjectSchema } from './RatingCreateNestedManyWithoutQuizInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuizCreateWithoutWinnerInput> = z
  .object({
    name: z.string(),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    difficulty: z.lazy(() => DifficultySchema),
    numberOfQuestions: z.number().optional(),
    questions: z
      .lazy(() => QuestionCreateNestedManyWithoutQuizzesInputObjectSchema)
      .optional(),
    Score: z
      .lazy(() => ScoreCreateNestedManyWithoutQuizInputObjectSchema)
      .optional(),
    Rating: z
      .lazy(() => RatingCreateNestedManyWithoutQuizInputObjectSchema)
      .optional(),
  })
  .strict();

export const QuizCreateWithoutWinnerInputObjectSchema = Schema;
