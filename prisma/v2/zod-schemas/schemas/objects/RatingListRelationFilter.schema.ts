import { z } from 'zod';
import { RatingWhereInputObjectSchema } from './RatingWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RatingListRelationFilter> = z
  .object({
    every: z.lazy(() => RatingWhereInputObjectSchema).optional(),
    some: z.lazy(() => RatingWhereInputObjectSchema).optional(),
    none: z.lazy(() => RatingWhereInputObjectSchema).optional(),
  })
  .strict();

export const RatingListRelationFilterObjectSchema = Schema;
