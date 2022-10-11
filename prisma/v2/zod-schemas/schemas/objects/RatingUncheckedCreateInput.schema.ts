import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RatingUncheckedCreateInput> = z
  .object({
    userId: z.number(),
    quizId: z.number(),
    rating: z.number(),
  })
  .strict();

export const RatingUncheckedCreateInputObjectSchema = Schema;
