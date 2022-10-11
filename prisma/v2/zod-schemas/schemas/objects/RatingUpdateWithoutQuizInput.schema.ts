import { z } from 'zod';
import { UserUpdateOneRequiredWithoutRatingsNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutRatingsNestedInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RatingUpdateWithoutQuizInput> = z
  .object({
    user: z
      .lazy(() => UserUpdateOneRequiredWithoutRatingsNestedInputObjectSchema)
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
