import { z } from 'zod';
import { RatingUserIdQuizIdCompoundUniqueInputObjectSchema } from './RatingUserIdQuizIdCompoundUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RatingWhereUniqueInput> = z
  .object({
    userId_quizId: z
      .lazy(() => RatingUserIdQuizIdCompoundUniqueInputObjectSchema)
      .optional(),
  })
  .strict();

export const RatingWhereUniqueInputObjectSchema = Schema;
