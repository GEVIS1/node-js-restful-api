import { z } from 'zod';
import { CategoryUpdateWithoutQuestionsInputObjectSchema } from './CategoryUpdateWithoutQuestionsInput.schema';
import { CategoryUncheckedUpdateWithoutQuestionsInputObjectSchema } from './CategoryUncheckedUpdateWithoutQuestionsInput.schema';
import { CategoryCreateWithoutQuestionsInputObjectSchema } from './CategoryCreateWithoutQuestionsInput.schema';
import { CategoryUncheckedCreateWithoutQuestionsInputObjectSchema } from './CategoryUncheckedCreateWithoutQuestionsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CategoryUpsertWithoutQuestionsInput> = z
  .object({
    update: z.union([
      z.lazy(() => CategoryUpdateWithoutQuestionsInputObjectSchema),
      z.lazy(() => CategoryUncheckedUpdateWithoutQuestionsInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => CategoryCreateWithoutQuestionsInputObjectSchema),
      z.lazy(() => CategoryUncheckedCreateWithoutQuestionsInputObjectSchema),
    ]),
  })
  .strict();

export const CategoryUpsertWithoutQuestionsInputObjectSchema = Schema;
