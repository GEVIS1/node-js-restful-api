import { z } from 'zod';
import { QuestionTypeSchema } from '../enums/QuestionType.schema';
import { NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumQuestionTypeFilterObjectSchema } from './NestedEnumQuestionTypeFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NestedEnumQuestionTypeWithAggregatesFilter> = z
  .object({
    equals: z.lazy(() => QuestionTypeSchema).optional(),
    in: z
      .lazy(() => QuestionTypeSchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => QuestionTypeSchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => QuestionTypeSchema),
        z.lazy(() => NestedEnumQuestionTypeWithAggregatesFilterObjectSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
    _min: z.lazy(() => NestedEnumQuestionTypeFilterObjectSchema).optional(),
    _max: z.lazy(() => NestedEnumQuestionTypeFilterObjectSchema).optional(),
  })
  .strict();

export const NestedEnumQuestionTypeWithAggregatesFilterObjectSchema = Schema;
