import { z } from 'zod';
import { DifficultySchema } from '../enums/Difficulty.schema';
import { QuestionUncheckedCreateNestedManyWithoutQuizzesInputObjectSchema } from './QuestionUncheckedCreateNestedManyWithoutQuizzesInput.schema';
import { ScoreUncheckedCreateNestedManyWithoutQuizInputObjectSchema } from './ScoreUncheckedCreateNestedManyWithoutQuizInput.schema';
import { RatingUncheckedCreateNestedManyWithoutQuizInputObjectSchema } from './RatingUncheckedCreateNestedManyWithoutQuizInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuizUncheckedCreateWithoutWinnerInput> = z
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
    score: z
      .lazy(() => ScoreUncheckedCreateNestedManyWithoutQuizInputObjectSchema)
      .optional(),
    rating: z
      .lazy(() => RatingUncheckedCreateNestedManyWithoutQuizInputObjectSchema)
      .optional(),
  })
  .strict();

export const QuizUncheckedCreateWithoutWinnerInputObjectSchema = Schema;
