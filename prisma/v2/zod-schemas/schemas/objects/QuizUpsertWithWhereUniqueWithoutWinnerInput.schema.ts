import { z } from 'zod';
import { QuizWhereUniqueInputObjectSchema } from './QuizWhereUniqueInput.schema';
import { QuizUpdateWithoutWinnerInputObjectSchema } from './QuizUpdateWithoutWinnerInput.schema';
import { QuizUncheckedUpdateWithoutWinnerInputObjectSchema } from './QuizUncheckedUpdateWithoutWinnerInput.schema';
import { QuizCreateWithoutWinnerInputObjectSchema } from './QuizCreateWithoutWinnerInput.schema';
import { QuizUncheckedCreateWithoutWinnerInputObjectSchema } from './QuizUncheckedCreateWithoutWinnerInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuizUpsertWithWhereUniqueWithoutWinnerInput> = z
  .object({
    where: z.lazy(() => QuizWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => QuizUpdateWithoutWinnerInputObjectSchema),
      z.lazy(() => QuizUncheckedUpdateWithoutWinnerInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => QuizCreateWithoutWinnerInputObjectSchema),
      z.lazy(() => QuizUncheckedCreateWithoutWinnerInputObjectSchema),
    ]),
  })
  .strict();

export const QuizUpsertWithWhereUniqueWithoutWinnerInputObjectSchema = Schema;
