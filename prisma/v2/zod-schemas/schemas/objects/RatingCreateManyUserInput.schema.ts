import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RatingCreateManyUserInput> = z
  .object({
    id: z.number().optional(),
    rating: z.number(),
  })
  .strict();

export const RatingCreateManyUserInputObjectSchema = Schema;
