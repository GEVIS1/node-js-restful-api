import { z } from 'zod';
import { CategoryUpdateOneWithoutQuestionsNestedInputObjectSchema } from './CategoryUpdateOneWithoutQuestionsNestedInput.schema';
import { QuestionTypeSchema } from '../enums/QuestionType.schema';
import { EnumQuestionTypeFieldUpdateOperationsInputObjectSchema } from './EnumQuestionTypeFieldUpdateOperationsInput.schema';
import { DifficultySchema } from '../enums/Difficulty.schema';
import { EnumDifficultyFieldUpdateOperationsInputObjectSchema } from './EnumDifficultyFieldUpdateOperationsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { QuestionUpdateincorrectAnswersInputObjectSchema } from './QuestionUpdateincorrectAnswersInput.schema';
import { QuizUpdateManyWithoutQuestionsNestedInputObjectSchema } from './QuizUpdateManyWithoutQuestionsNestedInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuestionUpdateInput> = z
  .object({
    category: z
      .lazy(() => CategoryUpdateOneWithoutQuestionsNestedInputObjectSchema)
      .optional(),
    type: z
      .union([
        z.lazy(() => QuestionTypeSchema),
        z.lazy(() => EnumQuestionTypeFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    difficulty: z
      .union([
        z.lazy(() => DifficultySchema),
        z.lazy(() => EnumDifficultyFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    question: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    correctAnswer: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    incorrectAnswers: z
      .union([
        z.lazy(() => QuestionUpdateincorrectAnswersInputObjectSchema),
        z.string().array(),
      ])
      .optional(),
    quizzes: z
      .lazy(() => QuizUpdateManyWithoutQuestionsNestedInputObjectSchema)
      .optional(),
  })
  .strict();

export const QuestionUpdateInputObjectSchema = Schema;
