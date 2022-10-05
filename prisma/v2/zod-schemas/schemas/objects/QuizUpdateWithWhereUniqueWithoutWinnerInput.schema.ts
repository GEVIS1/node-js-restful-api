import { z } from 'zod';
import { QuizWhereUniqueInputObjectSchema } from './QuizWhereUniqueInput.schema';
import { QuizUpdateWithoutWinnerInputObjectSchema } from './QuizUpdateWithoutWinnerInput.schema';
import { QuizUncheckedUpdateWithoutWinnerInputObjectSchema } from './QuizUncheckedUpdateWithoutWinnerInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuizUpdateWithWhereUniqueWithoutWinnerInput> = z
  .object({
    where: z.lazy(() => QuizWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => QuizUpdateWithoutWinnerInputObjectSchema),
      z.lazy(() => QuizUncheckedUpdateWithoutWinnerInputObjectSchema),
    ]),
  })
  .strict();

export const QuizUpdateWithWhereUniqueWithoutWinnerInputObjectSchema = Schema;
