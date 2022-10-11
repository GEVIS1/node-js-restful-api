import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RatingScalarWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => RatingScalarWhereInputObjectSchema),
        z.lazy(() => RatingScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => RatingScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => RatingScalarWhereInputObjectSchema),
        z.lazy(() => RatingScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    userId: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    quizId: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    rating: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
  })
  .strict();

export const RatingScalarWhereInputObjectSchema = Schema;
