import { z } from 'zod';
import { QuizWhereUniqueInputObjectSchema } from './QuizWhereUniqueInput.schema';
import { QuizUpdateWithoutQuestionsInputObjectSchema } from './QuizUpdateWithoutQuestionsInput.schema';
import { QuizUncheckedUpdateWithoutQuestionsInputObjectSchema } from './QuizUncheckedUpdateWithoutQuestionsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuizUpdateWithWhereUniqueWithoutQuestionsInput> =
  z
    .object({
      where: z.lazy(() => QuizWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => QuizUpdateWithoutQuestionsInputObjectSchema),
        z.lazy(() => QuizUncheckedUpdateWithoutQuestionsInputObjectSchema),
      ]),
    })
    .strict();

export const QuizUpdateWithWhereUniqueWithoutQuestionsInputObjectSchema =
  Schema;
