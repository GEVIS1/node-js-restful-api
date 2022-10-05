import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ScoreCreateWithoutUserInput> = z
  .object({
    score: z.number(),
  })
  .strict();

export const ScoreCreateWithoutUserInputObjectSchema = Schema;
