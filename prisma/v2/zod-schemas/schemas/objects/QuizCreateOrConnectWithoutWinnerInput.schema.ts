import { z } from 'zod';
import { QuizWhereUniqueInputObjectSchema } from './QuizWhereUniqueInput.schema';
import { QuizCreateWithoutWinnerInputObjectSchema } from './QuizCreateWithoutWinnerInput.schema';
import { QuizUncheckedCreateWithoutWinnerInputObjectSchema } from './QuizUncheckedCreateWithoutWinnerInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuizCreateOrConnectWithoutWinnerInput> = z
  .object({
    where: z.lazy(() => QuizWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => QuizCreateWithoutWinnerInputObjectSchema),
      z.lazy(() => QuizUncheckedCreateWithoutWinnerInputObjectSchema),
    ]),
  })
  .strict();

export const QuizCreateOrConnectWithoutWinnerInputObjectSchema = Schema;
