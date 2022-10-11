import { z } from 'zod';
import { ScoreUserIdQuizIdCompoundUniqueInputObjectSchema } from './ScoreUserIdQuizIdCompoundUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ScoreWhereUniqueInput> = z
  .object({
    userId_quizId: z
      .lazy(() => ScoreUserIdQuizIdCompoundUniqueInputObjectSchema)
      .optional(),
  })
  .strict();

export const ScoreWhereUniqueInputObjectSchema = Schema;
