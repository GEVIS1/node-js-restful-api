import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RatingUncheckedCreateWithoutUserInput> = z
  .object({
    id: z.number().optional(),
    quizId: z.number(),
    rating: z.number(),
  })
  .strict();

export const RatingUncheckedCreateWithoutUserInputObjectSchema = Schema;
