import { z } from 'zod';
import { UserUpdateOneRequiredWithoutScoresNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutScoresNestedInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ScoreUpdateWithoutQuizInput> = z
  .object({
    user: z
      .lazy(() => UserUpdateOneRequiredWithoutScoresNestedInputObjectSchema)
      .optional(),
    score: z
      .union([
        z.number(),
        z.lazy(() => IntFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const ScoreUpdateWithoutQuizInputObjectSchema = Schema;
