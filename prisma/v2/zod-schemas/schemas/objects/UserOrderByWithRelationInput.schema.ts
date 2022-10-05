import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { ScoreOrderByRelationAggregateInputObjectSchema } from './ScoreOrderByRelationAggregateInput.schema';
import { QuizOrderByRelationAggregateInputObjectSchema } from './QuizOrderByRelationAggregateInput.schema';
import { RatingOrderByRelationAggregateInputObjectSchema } from './RatingOrderByRelationAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    firstname: z.lazy(() => SortOrderSchema).optional(),
    lastname: z.lazy(() => SortOrderSchema).optional(),
    username: z.lazy(() => SortOrderSchema).optional(),
    email: z.lazy(() => SortOrderSchema).optional(),
    password: z.lazy(() => SortOrderSchema).optional(),
    avatar: z.lazy(() => SortOrderSchema).optional(),
    role: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    scores: z
      .lazy(() => ScoreOrderByRelationAggregateInputObjectSchema)
      .optional(),
    quizzes: z
      .lazy(() => QuizOrderByRelationAggregateInputObjectSchema)
      .optional(),
    ratings: z
      .lazy(() => RatingOrderByRelationAggregateInputObjectSchema)
      .optional(),
  })
  .strict();

export const UserOrderByWithRelationInputObjectSchema = Schema;
