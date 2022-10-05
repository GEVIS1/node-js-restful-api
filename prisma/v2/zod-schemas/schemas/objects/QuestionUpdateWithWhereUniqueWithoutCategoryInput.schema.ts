import { z } from 'zod';
import { QuestionWhereUniqueInputObjectSchema } from './QuestionWhereUniqueInput.schema';
import { QuestionUpdateWithoutCategoryInputObjectSchema } from './QuestionUpdateWithoutCategoryInput.schema';
import { QuestionUncheckedUpdateWithoutCategoryInputObjectSchema } from './QuestionUncheckedUpdateWithoutCategoryInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuestionUpdateWithWhereUniqueWithoutCategoryInput> =
  z
    .object({
      where: z.lazy(() => QuestionWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => QuestionUpdateWithoutCategoryInputObjectSchema),
        z.lazy(() => QuestionUncheckedUpdateWithoutCategoryInputObjectSchema),
      ]),
    })
    .strict();

export const QuestionUpdateWithWhereUniqueWithoutCategoryInputObjectSchema =
  Schema;
