import { z } from 'zod';
import { QuizScalarWhereInputObjectSchema } from './QuizScalarWhereInput.schema';
import { QuizUpdateManyMutationInputObjectSchema } from './QuizUpdateManyMutationInput.schema';
import { QuizUncheckedUpdateManyWithoutQuizInputObjectSchema } from './QuizUncheckedUpdateManyWithoutQuizInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuizUpdateManyWithWhereWithoutWinnerInput> = z
  .object({
    where: z.lazy(() => QuizScalarWhereInputObjectSchema),
    data: z.union([
      z.lazy(() => QuizUpdateManyMutationInputObjectSchema),
      z.lazy(() => QuizUncheckedUpdateManyWithoutQuizInputObjectSchema),
    ]),
  })
  .strict();

export const QuizUpdateManyWithWhereWithoutWinnerInputObjectSchema = Schema;
