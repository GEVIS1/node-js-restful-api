import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { ScoreCountOrderByAggregateInputObjectSchema } from './ScoreCountOrderByAggregateInput.schema';
import { ScoreAvgOrderByAggregateInputObjectSchema } from './ScoreAvgOrderByAggregateInput.schema';
import { ScoreMaxOrderByAggregateInputObjectSchema } from './ScoreMaxOrderByAggregateInput.schema';
import { ScoreMinOrderByAggregateInputObjectSchema } from './ScoreMinOrderByAggregateInput.schema';
import { ScoreSumOrderByAggregateInputObjectSchema } from './ScoreSumOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ScoreOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    quizId: z.lazy(() => SortOrderSchema).optional(),
    score: z.lazy(() => SortOrderSchema).optional(),
    _count: z
      .lazy(() => ScoreCountOrderByAggregateInputObjectSchema)
      .optional(),
    _avg: z.lazy(() => ScoreAvgOrderByAggregateInputObjectSchema).optional(),
    _max: z.lazy(() => ScoreMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => ScoreMinOrderByAggregateInputObjectSchema).optional(),
    _sum: z.lazy(() => ScoreSumOrderByAggregateInputObjectSchema).optional(),
  })
  .strict();

export const ScoreOrderByWithAggregationInputObjectSchema = Schema;
