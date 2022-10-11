import { z } from 'zod';
import { UserUpdateOneRequiredWithoutScoresNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutScoresNestedInput.schema';
import { QuizUpdateOneRequiredWithoutScoreNestedInputObjectSchema } from './QuizUpdateOneRequiredWithoutScoreNestedInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ScoreUpdateInput> = z
  .object({
    User: z
      .lazy(() => UserUpdateOneRequiredWithoutScoresNestedInputObjectSchema)
      .optional(),
    quiz: z
      .lazy(() => QuizUpdateOneRequiredWithoutScoreNestedInputObjectSchema)
      .optional(),
    score: z
      .union([
        z.number(),
        z.lazy(() => IntFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const ScoreUpdateInputObjectSchema = Schema;
