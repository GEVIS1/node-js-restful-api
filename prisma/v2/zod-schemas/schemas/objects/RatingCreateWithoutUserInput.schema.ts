import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RatingCreateWithoutUserInput> = z
  .object({
    rating: z.number(),
  })
  .strict();

export const RatingCreateWithoutUserInputObjectSchema = Schema;
