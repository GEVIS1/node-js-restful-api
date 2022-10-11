import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ScoreUncheckedCreateWithoutQuizInput> = z
  .object({
    userId: z.number(),
    score: z.number(),
  })
  .strict();

export const ScoreUncheckedCreateWithoutQuizInputObjectSchema = Schema;
