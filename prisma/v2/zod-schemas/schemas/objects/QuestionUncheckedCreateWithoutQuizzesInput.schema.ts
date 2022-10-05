import { z } from 'zod';
import { QuestionTypeSchema } from '../enums/QuestionType.schema';
import { DifficultySchema } from '../enums/Difficulty.schema';
import { QuestionCreateincorrectAnswersInputObjectSchema } from './QuestionCreateincorrectAnswersInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuestionUncheckedCreateWithoutQuizzesInput> = z
  .object({
    id: z.number().optional(),
    categoryId: z.number().optional().nullable(),
    type: z.lazy(() => QuestionTypeSchema),
    difficulty: z.lazy(() => DifficultySchema),
    question: z.string(),
    correctAnswer: z.string(),
    incorrectAnswers: z
      .union([
        z.lazy(() => QuestionCreateincorrectAnswersInputObjectSchema),
        z.string().array(),
      ])
      .optional(),
  })
  .strict();

export const QuestionUncheckedCreateWithoutQuizzesInputObjectSchema = Schema;
