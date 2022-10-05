import { z } from 'zod';
import { QuestionTypeSchema } from '../enums/QuestionType.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NestedEnumQuestionTypeFilter> = z
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
        z.lazy(() => NestedEnumQuestionTypeFilterObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const NestedEnumQuestionTypeFilterObjectSchema = Schema;
