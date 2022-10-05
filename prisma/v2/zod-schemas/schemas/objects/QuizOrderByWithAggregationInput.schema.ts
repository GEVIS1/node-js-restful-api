import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { QuizCountOrderByAggregateInputObjectSchema } from './QuizCountOrderByAggregateInput.schema';
import { QuizAvgOrderByAggregateInputObjectSchema } from './QuizAvgOrderByAggregateInput.schema';
import { QuizMaxOrderByAggregateInputObjectSchema } from './QuizMaxOrderByAggregateInput.schema';
import { QuizMinOrderByAggregateInputObjectSchema } from './QuizMinOrderByAggregateInput.schema';
import { QuizSumOrderByAggregateInputObjectSchema } from './QuizSumOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuizOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    startDate: z.lazy(() => SortOrderSchema).optional(),
    endDate: z.lazy(() => SortOrderSchema).optional(),
    difficulty: z.lazy(() => SortOrderSchema).optional(),
    numberOfQuestions: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => QuizCountOrderByAggregateInputObjectSchema).optional(),
    _avg: z.lazy(() => QuizAvgOrderByAggregateInputObjectSchema).optional(),
    _max: z.lazy(() => QuizMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => QuizMinOrderByAggregateInputObjectSchema).optional(),
    _sum: z.lazy(() => QuizSumOrderByAggregateInputObjectSchema).optional(),
  })
  .strict();

export const QuizOrderByWithAggregationInputObjectSchema = Schema;
