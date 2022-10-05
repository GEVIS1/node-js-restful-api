import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { EnumQuestionTypeFilterObjectSchema } from './EnumQuestionTypeFilter.schema';
import { QuestionTypeSchema } from '../enums/QuestionType.schema';
import { EnumDifficultyFilterObjectSchema } from './EnumDifficultyFilter.schema';
import { DifficultySchema } from '../enums/Difficulty.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuestionScalarWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => QuestionScalarWhereInputObjectSchema),
        z.lazy(() => QuestionScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => QuestionScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => QuestionScalarWhereInputObjectSchema),
        z.lazy(() => QuestionScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
    categoryId: z
      .union([z.lazy(() => IntNullableFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
    type: z
      .union([
        z.lazy(() => EnumQuestionTypeFilterObjectSchema),
        z.lazy(() => QuestionTypeSchema),
      ])
      .optional(),
    difficulty: z
      .union([
        z.lazy(() => EnumDifficultyFilterObjectSchema),
        z.lazy(() => DifficultySchema),
      ])
      .optional(),
    question: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    correctAnswer: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    incorrectAnswers: z
      .lazy(() => StringNullableListFilterObjectSchema)
      .optional(),
  })
  .strict();

export const QuestionScalarWhereInputObjectSchema = Schema;
