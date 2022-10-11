import { z } from 'zod';
import { UserUpdateOneRequiredWithoutScoreNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutScoreNestedInput.schema';
import { QuizUpdateOneRequiredWithoutScoreNestedInputObjectSchema } from './QuizUpdateOneRequiredWithoutScoreNestedInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ScoreUpdateInput> = z
  .object({
    user: z
      .lazy(() => UserUpdateOneRequiredWithoutScoreNestedInputObjectSchema)
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
