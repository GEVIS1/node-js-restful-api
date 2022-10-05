import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { CategoryOrderByWithRelationInputObjectSchema } from './CategoryOrderByWithRelationInput.schema';
import { QuizOrderByRelationAggregateInputObjectSchema } from './QuizOrderByRelationAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuestionOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    category: z
      .lazy(() => CategoryOrderByWithRelationInputObjectSchema)
      .optional(),
    categoryId: z.lazy(() => SortOrderSchema).optional(),
    type: z.lazy(() => SortOrderSchema).optional(),
    difficulty: z.lazy(() => SortOrderSchema).optional(),
    question: z.lazy(() => SortOrderSchema).optional(),
    correctAnswer: z.lazy(() => SortOrderSchema).optional(),
    incorrectAnswers: z.lazy(() => SortOrderSchema).optional(),
    quizzes: z
      .lazy(() => QuizOrderByRelationAggregateInputObjectSchema)
      .optional(),
  })
  .strict();

export const QuestionOrderByWithRelationInputObjectSchema = Schema;
