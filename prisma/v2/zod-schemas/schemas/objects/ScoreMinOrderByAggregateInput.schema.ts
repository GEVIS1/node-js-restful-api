import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ScoreMinOrderByAggregateInput> = z
  .object({
    userId: z.lazy(() => SortOrderSchema).optional(),
    quizId: z.lazy(() => SortOrderSchema).optional(),
    score: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const ScoreMinOrderByAggregateInputObjectSchema = Schema;
