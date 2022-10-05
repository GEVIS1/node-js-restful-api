import { z } from 'zod';
import { CategoryWhereUniqueInputObjectSchema } from './CategoryWhereUniqueInput.schema';
import { CategoryCreateWithoutQuestionsInputObjectSchema } from './CategoryCreateWithoutQuestionsInput.schema';
import { CategoryUncheckedCreateWithoutQuestionsInputObjectSchema } from './CategoryUncheckedCreateWithoutQuestionsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CategoryCreateOrConnectWithoutQuestionsInput> = z
  .object({
    where: z.lazy(() => CategoryWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => CategoryCreateWithoutQuestionsInputObjectSchema),
      z.lazy(() => CategoryUncheckedCreateWithoutQuestionsInputObjectSchema),
    ]),
  })
  .strict();

export const CategoryCreateOrConnectWithoutQuestionsInputObjectSchema = Schema;
