import { z } from 'zod';
import { UserCreateNestedOneWithoutScoreInputObjectSchema } from './UserCreateNestedOneWithoutScoreInput.schema';
import { QuizCreateNestedOneWithoutScoreInputObjectSchema } from './QuizCreateNestedOneWithoutScoreInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ScoreCreateInput> = z
  .object({
    user: z.lazy(() => UserCreateNestedOneWithoutScoreInputObjectSchema),
    quiz: z.lazy(() => QuizCreateNestedOneWithoutScoreInputObjectSchema),
    score: z.number(),
  })
  .strict();

export const ScoreCreateInputObjectSchema = Schema;
