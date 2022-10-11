import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { RatingCountOrderByAggregateInputObjectSchema } from './RatingCountOrderByAggregateInput.schema';
import { RatingAvgOrderByAggregateInputObjectSchema } from './RatingAvgOrderByAggregateInput.schema';
import { RatingMaxOrderByAggregateInputObjectSchema } from './RatingMaxOrderByAggregateInput.schema';
import { RatingMinOrderByAggregateInputObjectSchema } from './RatingMinOrderByAggregateInput.schema';
import { RatingSumOrderByAggregateInputObjectSchema } from './RatingSumOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RatingOrderByWithAggregationInput> = z
  .object({
    userId: z.lazy(() => SortOrderSchema).optional(),
    quizId: z.lazy(() => SortOrderSchema).optional(),
    rating: z.lazy(() => SortOrderSchema).optional(),
    _count: z
      .lazy(() => RatingCountOrderByAggregateInputObjectSchema)
      .optional(),
    _avg: z.lazy(() => RatingAvgOrderByAggregateInputObjectSchema).optional(),
    _max: z.lazy(() => RatingMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => RatingMinOrderByAggregateInputObjectSchema).optional(),
    _sum: z.lazy(() => RatingSumOrderByAggregateInputObjectSchema).optional(),
  })
  .strict();

export const RatingOrderByWithAggregationInputObjectSchema = Schema;
