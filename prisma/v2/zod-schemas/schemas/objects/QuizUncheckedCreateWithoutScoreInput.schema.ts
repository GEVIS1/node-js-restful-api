import { z } from 'zod';
import { DifficultySchema } from '../enums/Difficulty.schema';
import { QuestionUncheckedCreateNestedManyWithoutQuizzesInputObjectSchema } from './QuestionUncheckedCreateNestedManyWithoutQuizzesInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuizUncheckedCreateWithoutScoreInput> = z
  .object({
    id: z.number().optional(),
    name: z.string(),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    difficulty: z.lazy(() => DifficultySchema),
    numberOfQuestions: z.number().optional(),
    questions: z
      .lazy(
        () => QuestionUncheckedCreateNestedManyWithoutQuizzesInputObjectSchema
      )
      .optional(),
    userId: z.number().optional().nullable(),
  })
  .strict();

export const QuizUncheckedCreateWithoutScoreInputObjectSchema = Schema;
