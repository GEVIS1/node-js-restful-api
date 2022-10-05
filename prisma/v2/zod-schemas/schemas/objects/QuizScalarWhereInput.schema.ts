import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { EnumDifficultyFilterObjectSchema } from './EnumDifficultyFilter.schema';
import { DifficultySchema } from '../enums/Difficulty.schema';
import { IntNullableFilterObjectSchema } from './IntNullableFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuizScalarWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => QuizScalarWhereInputObjectSchema),
        z.lazy(() => QuizScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => QuizScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => QuizScalarWhereInputObjectSchema),
        z.lazy(() => QuizScalarWhereInputObjectSchema).array(),
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
    userId: z
      .union([z.lazy(() => IntNullableFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
  })
  .strict();

export const QuizScalarWhereInputObjectSchema = Schema;
