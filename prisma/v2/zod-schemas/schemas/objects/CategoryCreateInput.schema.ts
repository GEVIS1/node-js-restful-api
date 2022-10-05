import { z } from 'zod';
import { QuestionCreateNestedManyWithoutCategoryInputObjectSchema } from './QuestionCreateNestedManyWithoutCategoryInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CategoryCreateInput> = z
  .object({
    id: z.number(),
    name: z.string(),
    questions: z
      .lazy(() => QuestionCreateNestedManyWithoutCategoryInputObjectSchema)
      .optional(),
  })
  .strict();

export const CategoryCreateInputObjectSchema = Schema;
