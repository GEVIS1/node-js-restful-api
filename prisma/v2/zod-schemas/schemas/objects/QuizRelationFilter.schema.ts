import { z } from 'zod';
import { QuizWhereInputObjectSchema } from './QuizWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuizRelationFilter> = z
  .object({
    is: z.lazy(() => QuizWhereInputObjectSchema).optional(),
    isNot: z.lazy(() => QuizWhereInputObjectSchema).optional(),
  })
  .strict();

export const QuizRelationFilterObjectSchema = Schema;
