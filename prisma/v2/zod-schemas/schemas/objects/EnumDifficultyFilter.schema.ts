import { z } from 'zod';
import { DifficultySchema } from '../enums/Difficulty.schema';
import { NestedEnumDifficultyFilterObjectSchema } from './NestedEnumDifficultyFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumDifficultyFilter> = z
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
        z.lazy(() => NestedEnumDifficultyFilterObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const EnumDifficultyFilterObjectSchema = Schema;
