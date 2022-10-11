import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ScoreUncheckedCreateWithoutQuizInput> = z
  .object({
    id: z.number().optional(),
    userId: z.number(),
    score: z.number(),
  })
  .strict();

export const ScoreUncheckedCreateWithoutQuizInputObjectSchema = Schema;
