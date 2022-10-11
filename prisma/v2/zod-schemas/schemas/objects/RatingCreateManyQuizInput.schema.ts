import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RatingCreateManyQuizInput> = z
  .object({
    userId: z.number(),
    rating: z.number(),
  })
  .strict();

export const RatingCreateManyQuizInputObjectSchema = Schema;
