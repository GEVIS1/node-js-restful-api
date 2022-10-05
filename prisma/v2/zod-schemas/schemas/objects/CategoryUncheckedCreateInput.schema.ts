import { z } from 'zod';
import { QuestionUncheckedCreateNestedManyWithoutCategoryInputObjectSchema } from './QuestionUncheckedCreateNestedManyWithoutCategoryInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CategoryUncheckedCreateInput> = z
  .object({
    id: z.number(),
    name: z.string(),
    questions: z
      .lazy(
        () => QuestionUncheckedCreateNestedManyWithoutCategoryInputObjectSchema
      )
      .optional(),
  })
  .strict();

export const CategoryUncheckedCreateInputObjectSchema = Schema;
