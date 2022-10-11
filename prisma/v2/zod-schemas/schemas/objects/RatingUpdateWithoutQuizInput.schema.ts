import { z } from 'zod';
import { UserUpdateOneRequiredWithoutRatingNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutRatingNestedInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RatingUpdateWithoutQuizInput> = z
  .object({
    user: z
      .lazy(() => UserUpdateOneRequiredWithoutRatingNestedInputObjectSchema)
      .optional(),
    rating: z
      .union([
        z.number(),
        z.lazy(() => IntFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const RatingUpdateWithoutQuizInputObjectSchema = Schema;
