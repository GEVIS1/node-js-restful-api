import { z } from 'zod';
import { UserCreateNestedOneWithoutScoresInputObjectSchema } from './UserCreateNestedOneWithoutScoresInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ScoreCreateWithoutQuizInput> = z
  .object({
    User: z.lazy(() => UserCreateNestedOneWithoutScoresInputObjectSchema),
    score: z.number(),
  })
  .strict();

export const ScoreCreateWithoutQuizInputObjectSchema = Schema;
