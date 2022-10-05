import { z } from 'zod';
import { QuestionWhereUniqueInputObjectSchema } from './QuestionWhereUniqueInput.schema';
import { QuestionCreateWithoutCategoryInputObjectSchema } from './QuestionCreateWithoutCategoryInput.schema';
import { QuestionUncheckedCreateWithoutCategoryInputObjectSchema } from './QuestionUncheckedCreateWithoutCategoryInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuestionCreateOrConnectWithoutCategoryInput> = z
  .object({
    where: z.lazy(() => QuestionWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => QuestionCreateWithoutCategoryInputObjectSchema),
      z.lazy(() => QuestionUncheckedCreateWithoutCategoryInputObjectSchema),
    ]),
  })
  .strict();

export const QuestionCreateOrConnectWithoutCategoryInputObjectSchema = Schema;
