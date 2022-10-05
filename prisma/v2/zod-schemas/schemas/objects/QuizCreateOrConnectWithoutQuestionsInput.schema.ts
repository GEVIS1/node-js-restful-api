import { z } from 'zod';
import { QuizWhereUniqueInputObjectSchema } from './QuizWhereUniqueInput.schema';
import { QuizCreateWithoutQuestionsInputObjectSchema } from './QuizCreateWithoutQuestionsInput.schema';
import { QuizUncheckedCreateWithoutQuestionsInputObjectSchema } from './QuizUncheckedCreateWithoutQuestionsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuizCreateOrConnectWithoutQuestionsInput> = z
  .object({
    where: z.lazy(() => QuizWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => QuizCreateWithoutQuestionsInputObjectSchema),
      z.lazy(() => QuizUncheckedCreateWithoutQuestionsInputObjectSchema),
    ]),
  })
  .strict();

export const QuizCreateOrConnectWithoutQuestionsInputObjectSchema = Schema;
