import { z } from 'zod';
import { QuizWhereUniqueInputObjectSchema } from './QuizWhereUniqueInput.schema';
import { QuizUpdateWithoutQuestionsInputObjectSchema } from './QuizUpdateWithoutQuestionsInput.schema';
import { QuizUncheckedUpdateWithoutQuestionsInputObjectSchema } from './QuizUncheckedUpdateWithoutQuestionsInput.schema';
import { QuizCreateWithoutQuestionsInputObjectSchema } from './QuizCreateWithoutQuestionsInput.schema';
import { QuizUncheckedCreateWithoutQuestionsInputObjectSchema } from './QuizUncheckedCreateWithoutQuestionsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuizUpsertWithWhereUniqueWithoutQuestionsInput> =
  z
    .object({
      where: z.lazy(() => QuizWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => QuizUpdateWithoutQuestionsInputObjectSchema),
        z.lazy(() => QuizUncheckedUpdateWithoutQuestionsInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => QuizCreateWithoutQuestionsInputObjectSchema),
        z.lazy(() => QuizUncheckedCreateWithoutQuestionsInputObjectSchema),
      ]),
    })
    .strict();

export const QuizUpsertWithWhereUniqueWithoutQuestionsInputObjectSchema =
  Schema;
