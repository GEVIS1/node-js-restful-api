import { z } from 'zod';
import { QuestionTypeSchema } from '../enums/QuestionType.schema';
import { DifficultySchema } from '../enums/Difficulty.schema';
import { QuestionCreateincorrectAnswersInputObjectSchema } from './QuestionCreateincorrectAnswersInput.schema';
import { QuizCreateNestedManyWithoutQuestionsInputObjectSchema } from './QuizCreateNestedManyWithoutQuestionsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuestionCreateWithoutCategoryInput> = z
  .object({
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
    quizzes: z
      .lazy(() => QuizCreateNestedManyWithoutQuestionsInputObjectSchema)
      .optional(),
  })
  .strict();

export const QuestionCreateWithoutCategoryInputObjectSchema = Schema;
