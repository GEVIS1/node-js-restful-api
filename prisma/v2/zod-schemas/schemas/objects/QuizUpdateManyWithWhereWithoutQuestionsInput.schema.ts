import { z } from 'zod';
import { QuizScalarWhereInputObjectSchema } from './QuizScalarWhereInput.schema';
import { QuizUpdateManyMutationInputObjectSchema } from './QuizUpdateManyMutationInput.schema';
import { QuizUncheckedUpdateManyWithoutQuizzesInputObjectSchema } from './QuizUncheckedUpdateManyWithoutQuizzesInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuizUpdateManyWithWhereWithoutQuestionsInput> = z
  .object({
    where: z.lazy(() => QuizScalarWhereInputObjectSchema),
    data: z.union([
      z.lazy(() => QuizUpdateManyMutationInputObjectSchema),
      z.lazy(() => QuizUncheckedUpdateManyWithoutQuizzesInputObjectSchema),
    ]),
  })
  .strict();

export const QuizUpdateManyWithWhereWithoutQuestionsInputObjectSchema = Schema;
