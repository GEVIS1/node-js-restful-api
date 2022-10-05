import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ScoreCreateManyUserInput> = z
  .object({
    id: z.number().optional(),
    score: z.number(),
  })
  .strict();

export const ScoreCreateManyUserInputObjectSchema = Schema;
