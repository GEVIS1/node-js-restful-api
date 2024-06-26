import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { UserRelationFilterObjectSchema } from './UserRelationFilter.schema';
import { UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { QuizRelationFilterObjectSchema } from './QuizRelationFilter.schema';
import { QuizWhereInputObjectSchema } from './QuizWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ScoreWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => ScoreWhereInputObjectSchema),
        z.lazy(() => ScoreWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ScoreWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ScoreWhereInputObjectSchema),
        z.lazy(() => ScoreWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
    userId: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    user: z
      .union([
        z.lazy(() => UserRelationFilterObjectSchema),
        z.lazy(() => UserWhereInputObjectSchema),
      ])
      .optional(),
    quizId: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    quiz: z
      .union([
        z.lazy(() => QuizRelationFilterObjectSchema),
        z.lazy(() => QuizWhereInputObjectSchema),
      ])
      .optional(),
    score: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
  })
  .strict();

export const ScoreWhereInputObjectSchema = Schema;
