import { z } from 'zod';
import { ScoreWhereInputObjectSchema } from './ScoreWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ScoreListRelationFilter> = z
  .object({
    every: z.lazy(() => ScoreWhereInputObjectSchema).optional(),
    some: z.lazy(() => ScoreWhereInputObjectSchema).optional(),
    none: z.lazy(() => ScoreWhereInputObjectSchema).optional(),
  })
  .strict();

export const ScoreListRelationFilterObjectSchema = Schema;
