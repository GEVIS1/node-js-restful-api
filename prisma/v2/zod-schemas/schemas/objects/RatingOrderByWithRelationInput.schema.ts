import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { QuizOrderByWithRelationInputObjectSchema } from './QuizOrderByWithRelationInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RatingOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    quizId: z.lazy(() => SortOrderSchema).optional(),
    quiz: z.lazy(() => QuizOrderByWithRelationInputObjectSchema).optional(),
    rating: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const RatingOrderByWithRelationInputObjectSchema = Schema;
