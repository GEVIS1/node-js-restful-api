import { z } from 'zod';
import { QuizUpdateWithoutScoreInputObjectSchema } from './QuizUpdateWithoutScoreInput.schema';
import { QuizUncheckedUpdateWithoutScoreInputObjectSchema } from './QuizUncheckedUpdateWithoutScoreInput.schema';
import { QuizCreateWithoutScoreInputObjectSchema } from './QuizCreateWithoutScoreInput.schema';
import { QuizUncheckedCreateWithoutScoreInputObjectSchema } from './QuizUncheckedCreateWithoutScoreInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuizUpsertWithoutScoreInput> = z
  .object({
    update: z.union([
      z.lazy(() => QuizUpdateWithoutScoreInputObjectSchema),
      z.lazy(() => QuizUncheckedUpdateWithoutScoreInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => QuizCreateWithoutScoreInputObjectSchema),
      z.lazy(() => QuizUncheckedCreateWithoutScoreInputObjectSchema),
    ]),
  })
  .strict();

export const QuizUpsertWithoutScoreInputObjectSchema = Schema;
