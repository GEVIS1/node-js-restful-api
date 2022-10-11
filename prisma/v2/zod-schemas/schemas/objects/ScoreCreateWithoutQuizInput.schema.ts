import { z } from 'zod';
import { UserCreateNestedOneWithoutScoreInputObjectSchema } from './UserCreateNestedOneWithoutScoreInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ScoreCreateWithoutQuizInput> = z
  .object({
    user: z.lazy(() => UserCreateNestedOneWithoutScoreInputObjectSchema),
    score: z.number(),
  })
  .strict();

export const ScoreCreateWithoutQuizInputObjectSchema = Schema;
