import { z } from 'zod';
import { QuizUpdateOneRequiredWithoutRatingNestedInputObjectSchema } from './QuizUpdateOneRequiredWithoutRatingNestedInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RatingUpdateWithoutUserInput> = z
  .object({
    quiz: z
      .lazy(() => QuizUpdateOneRequiredWithoutRatingNestedInputObjectSchema)
      .optional(),
    rating: z
      .union([
        z.number(),
        z.lazy(() => IntFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const RatingUpdateWithoutUserInputObjectSchema = Schema;
