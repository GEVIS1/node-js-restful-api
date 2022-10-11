import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { QuestionOrderByRelationAggregateInputObjectSchema } from './QuestionOrderByRelationAggregateInput.schema';
import { UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { ScoreOrderByRelationAggregateInputObjectSchema } from './ScoreOrderByRelationAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuizOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    startDate: z.lazy(() => SortOrderSchema).optional(),
    endDate: z.lazy(() => SortOrderSchema).optional(),
    difficulty: z.lazy(() => SortOrderSchema).optional(),
    numberOfQuestions: z.lazy(() => SortOrderSchema).optional(),
    questions: z
      .lazy(() => QuestionOrderByRelationAggregateInputObjectSchema)
      .optional(),
    winner: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    Score: z
      .lazy(() => ScoreOrderByRelationAggregateInputObjectSchema)
      .optional(),
  })
  .strict();

export const QuizOrderByWithRelationInputObjectSchema = Schema;
