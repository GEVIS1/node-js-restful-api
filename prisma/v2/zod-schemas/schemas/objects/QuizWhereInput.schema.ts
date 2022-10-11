import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { EnumDifficultyFilterObjectSchema } from './EnumDifficultyFilter.schema';
import { DifficultySchema } from '../enums/Difficulty.schema';
import { QuestionListRelationFilterObjectSchema } from './QuestionListRelationFilter.schema';
import { UserRelationFilterObjectSchema } from './UserRelationFilter.schema';
import { UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { ScoreListRelationFilterObjectSchema } from './ScoreListRelationFilter.schema';
import { RatingListRelationFilterObjectSchema } from './RatingListRelationFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuizWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => QuizWhereInputObjectSchema),
        z.lazy(() => QuizWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => QuizWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => QuizWhereInputObjectSchema),
        z.lazy(() => QuizWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
    name: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    startDate: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.date()])
      .optional(),
    endDate: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.date()])
      .optional(),
    difficulty: z
      .union([
        z.lazy(() => EnumDifficultyFilterObjectSchema),
        z.lazy(() => DifficultySchema),
      ])
      .optional(),
    numberOfQuestions: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    questions: z.lazy(() => QuestionListRelationFilterObjectSchema).optional(),
    winner: z
      .union([
        z.lazy(() => UserRelationFilterObjectSchema),
        z.lazy(() => UserWhereInputObjectSchema),
      ])
      .optional()
      .nullable(),
    userId: z
      .union([z.lazy(() => IntNullableFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
    Score: z.lazy(() => ScoreListRelationFilterObjectSchema).optional(),
    Rating: z.lazy(() => RatingListRelationFilterObjectSchema).optional(),
  })
  .strict();

export const QuizWhereInputObjectSchema = Schema;
