import { z } from 'zod';
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { DifficultySchema } from '../enums/Difficulty.schema';
import { EnumDifficultyFieldUpdateOperationsInputObjectSchema } from './EnumDifficultyFieldUpdateOperationsInput.schema';
import { QuestionUncheckedUpdateManyWithoutQuizzesNestedInputObjectSchema } from './QuestionUncheckedUpdateManyWithoutQuizzesNestedInput.schema';
import { ScoreUncheckedUpdateManyWithoutQuizNestedInputObjectSchema } from './ScoreUncheckedUpdateManyWithoutQuizNestedInput.schema';
import { RatingUncheckedUpdateManyWithoutQuizNestedInputObjectSchema } from './RatingUncheckedUpdateManyWithoutQuizNestedInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuizUncheckedUpdateWithoutWinnerInput> = z
  .object({
    id: z
      .union([
        z.number(),
        z.lazy(() => IntFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
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
      .lazy(
        () => QuestionUncheckedUpdateManyWithoutQuizzesNestedInputObjectSchema
      )
      .optional(),
    score: z
      .lazy(() => ScoreUncheckedUpdateManyWithoutQuizNestedInputObjectSchema)
      .optional(),
    rating: z
      .lazy(() => RatingUncheckedUpdateManyWithoutQuizNestedInputObjectSchema)
      .optional(),
  })
  .strict();

export const QuizUncheckedUpdateWithoutWinnerInputObjectSchema = Schema;
