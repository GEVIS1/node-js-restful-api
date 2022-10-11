import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RatingUserIdQuizIdCompoundUniqueInput> = z
  .object({
    userId: z.number(),
    quizId: z.number(),
  })
  .strict();

export const RatingUserIdQuizIdCompoundUniqueInputObjectSchema = Schema;
