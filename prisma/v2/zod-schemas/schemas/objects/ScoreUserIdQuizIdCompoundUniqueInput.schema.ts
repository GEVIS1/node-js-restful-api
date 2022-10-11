import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ScoreUserIdQuizIdCompoundUniqueInput> = z
  .object({
    userId: z.number(),
    quizId: z.number(),
  })
  .strict();

export const ScoreUserIdQuizIdCompoundUniqueInputObjectSchema = Schema;
