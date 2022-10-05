import { z } from 'zod';
import { DifficultySchema } from '../enums/Difficulty.schema';
import { NestedEnumDifficultyWithAggregatesFilterObjectSchema } from './NestedEnumDifficultyWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumDifficultyFilterObjectSchema } from './NestedEnumDifficultyFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumDifficultyWithAggregatesFilter> = z
  .object({
    equals: z.lazy(() => DifficultySchema).optional(),
    in: z
      .lazy(() => DifficultySchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => DifficultySchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => DifficultySchema),
        z.lazy(() => NestedEnumDifficultyWithAggregatesFilterObjectSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
    _min: z.lazy(() => NestedEnumDifficultyFilterObjectSchema).optional(),
    _max: z.lazy(() => NestedEnumDifficultyFilterObjectSchema).optional(),
  })
  .strict();

export const EnumDifficultyWithAggregatesFilterObjectSchema = Schema;
