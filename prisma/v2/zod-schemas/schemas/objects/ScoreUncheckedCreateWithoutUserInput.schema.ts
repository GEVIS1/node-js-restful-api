import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ScoreUncheckedCreateWithoutUserInput> = z
  .object({
    id: z.number().optional(),
    quizId: z.number(),
    score: z.number(),
  })
  .strict();

export const ScoreUncheckedCreateWithoutUserInputObjectSchema = Schema;
