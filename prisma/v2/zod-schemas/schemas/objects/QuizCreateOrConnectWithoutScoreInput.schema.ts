import { z } from 'zod';
import { QuizWhereUniqueInputObjectSchema } from './QuizWhereUniqueInput.schema';
import { QuizCreateWithoutScoreInputObjectSchema } from './QuizCreateWithoutScoreInput.schema';
import { QuizUncheckedCreateWithoutScoreInputObjectSchema } from './QuizUncheckedCreateWithoutScoreInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuizCreateOrConnectWithoutScoreInput> = z
  .object({
    where: z.lazy(() => QuizWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => QuizCreateWithoutScoreInputObjectSchema),
      z.lazy(() => QuizUncheckedCreateWithoutScoreInputObjectSchema),
    ]),
  })
  .strict();

export const QuizCreateOrConnectWithoutScoreInputObjectSchema = Schema;
