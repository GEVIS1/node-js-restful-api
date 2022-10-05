import { z } from 'zod';
import { QuestionWhereUniqueInputObjectSchema } from './QuestionWhereUniqueInput.schema';
import { QuestionUpdateWithoutCategoryInputObjectSchema } from './QuestionUpdateWithoutCategoryInput.schema';
import { QuestionUncheckedUpdateWithoutCategoryInputObjectSchema } from './QuestionUncheckedUpdateWithoutCategoryInput.schema';
import { QuestionCreateWithoutCategoryInputObjectSchema } from './QuestionCreateWithoutCategoryInput.schema';
import { QuestionUncheckedCreateWithoutCategoryInputObjectSchema } from './QuestionUncheckedCreateWithoutCategoryInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuestionUpsertWithWhereUniqueWithoutCategoryInput> =
  z
    .object({
      where: z.lazy(() => QuestionWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => QuestionUpdateWithoutCategoryInputObjectSchema),
        z.lazy(() => QuestionUncheckedUpdateWithoutCategoryInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => QuestionCreateWithoutCategoryInputObjectSchema),
        z.lazy(() => QuestionUncheckedCreateWithoutCategoryInputObjectSchema),
      ]),
    })
    .strict();

export const QuestionUpsertWithWhereUniqueWithoutCategoryInputObjectSchema =
  Schema;
