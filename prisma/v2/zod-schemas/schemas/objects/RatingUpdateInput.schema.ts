import { z } from 'zod';
import { UserUpdateOneRequiredWithoutRatingNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutRatingNestedInput.schema';
import { QuizUpdateOneRequiredWithoutRatingNestedInputObjectSchema } from './QuizUpdateOneRequiredWithoutRatingNestedInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RatingUpdateInput> = z
  .object({
    user: z
      .lazy(() => UserUpdateOneRequiredWithoutRatingNestedInputObjectSchema)
      .optional(),
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

export const RatingUpdateInputObjectSchema = Schema;
