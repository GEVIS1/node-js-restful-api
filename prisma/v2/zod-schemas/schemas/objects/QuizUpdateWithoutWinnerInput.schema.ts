import { z } from 'zod';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { DifficultySchema } from '../enums/Difficulty.schema';
import { EnumDifficultyFieldUpdateOperationsInputObjectSchema } from './EnumDifficultyFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { QuestionUpdateManyWithoutQuizzesNestedInputObjectSchema } from './QuestionUpdateManyWithoutQuizzesNestedInput.schema';
import { ScoreUpdateManyWithoutQuizNestedInputObjectSchema } from './ScoreUpdateManyWithoutQuizNestedInput.schema';
import { RatingUpdateManyWithoutQuizNestedInputObjectSchema } from './RatingUpdateManyWithoutQuizNestedInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuizUpdateWithoutWinnerInput> = z
  .object({
    name: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    startDate: z
      .union([
        z.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    endDate: z
      .union([
        z.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    difficulty: z
      .union([
        z.lazy(() => DifficultySchema),
        z.lazy(() => EnumDifficultyFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    numberOfQuestions: z
      .union([
        z.number(),
        z.lazy(() => IntFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    questions: z
      .lazy(() => QuestionUpdateManyWithoutQuizzesNestedInputObjectSchema)
      .optional(),
    score: z
      .lazy(() => ScoreUpdateManyWithoutQuizNestedInputObjectSchema)
      .optional(),
    rating: z
      .lazy(() => RatingUpdateManyWithoutQuizNestedInputObjectSchema)
      .optional(),
  })
  .strict();

export const QuizUpdateWithoutWinnerInputObjectSchema = Schema;
