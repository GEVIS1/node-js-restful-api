import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ScoreUncheckedCreateInput> = z
  .object({
    userId: z.number(),
    quizId: z.number(),
    score: z.number(),
  })
  .strict();

export const ScoreUncheckedCreateInputObjectSchema = Schema;
