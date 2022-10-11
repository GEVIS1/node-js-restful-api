import { z } from 'zod';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { DifficultySchema } from '../enums/Difficulty.schema';
import { EnumDifficultyFieldUpdateOperationsInputObjectSchema } from './EnumDifficultyFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { QuestionUpdateManyWithoutQuizzesNestedInputObjectSchema } from './QuestionUpdateManyWithoutQuizzesNestedInput.schema';
import { UserUpdateOneWithoutQuizzesNestedInputObjectSchema } from './UserUpdateOneWithoutQuizzesNestedInput.schema';
import { ScoreUpdateManyWithoutQuizNestedInputObjectSchema } from './ScoreUpdateManyWithoutQuizNestedInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuizUpdateWithoutRatingInput> = z
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
    winner: z
      .lazy(() => UserUpdateOneWithoutQuizzesNestedInputObjectSchema)
      .optional(),
    Score: z
      .lazy(() => ScoreUpdateManyWithoutQuizNestedInputObjectSchema)
      .optional(),
  })
  .strict();

export const QuizUpdateWithoutRatingInputObjectSchema = Schema;
