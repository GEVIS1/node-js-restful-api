import { z } from 'zod';
import { QuizCreateNestedOneWithoutScoreInputObjectSchema } from './QuizCreateNestedOneWithoutScoreInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ScoreCreateWithoutUserInput> = z
  .object({
    quiz: z.lazy(() => QuizCreateNestedOneWithoutScoreInputObjectSchema),
    score: z.number(),
  })
  .strict();

export const ScoreCreateWithoutUserInputObjectSchema = Schema;
