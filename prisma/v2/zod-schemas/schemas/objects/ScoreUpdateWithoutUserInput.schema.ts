import { z } from 'zod';
import { QuizUpdateOneRequiredWithoutScoreNestedInputObjectSchema } from './QuizUpdateOneRequiredWithoutScoreNestedInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ScoreUpdateWithoutUserInput> = z
  .object({
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

export const ScoreUpdateWithoutUserInputObjectSchema = Schema;
