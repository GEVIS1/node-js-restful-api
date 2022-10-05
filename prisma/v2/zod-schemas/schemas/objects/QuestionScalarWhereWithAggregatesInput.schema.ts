import { z } from 'zod';
import { IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { IntNullableWithAggregatesFilterObjectSchema } from './IntNullableWithAggregatesFilter.schema';
import { EnumQuestionTypeWithAggregatesFilterObjectSchema } from './EnumQuestionTypeWithAggregatesFilter.schema';
import { QuestionTypeSchema } from '../enums/QuestionType.schema';
import { EnumDifficultyWithAggregatesFilterObjectSchema } from './EnumDifficultyWithAggregatesFilter.schema';
import { DifficultySchema } from '../enums/Difficulty.schema';
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuestionScalarWhereWithAggregatesInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => QuestionScalarWhereWithAggregatesInputObjectSchema),
        z
          .lazy(() => QuestionScalarWhereWithAggregatesInputObjectSchema)
          .array(),
      ])
      .optional(),
    OR: z
      .lazy(() => QuestionScalarWhereWithAggregatesInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => QuestionScalarWhereWithAggregatesInputObjectSchema),
        z
          .lazy(() => QuestionScalarWhereWithAggregatesInputObjectSchema)
          .array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number()])
      .optional(),
    categoryId: z
      .union([
        z.lazy(() => IntNullableWithAggregatesFilterObjectSchema),
        z.number(),
      ])
      .optional()
      .nullable(),
    type: z
      .union([
        z.lazy(() => EnumQuestionTypeWithAggregatesFilterObjectSchema),
        z.lazy(() => QuestionTypeSchema),
      ])
      .optional(),
    difficulty: z
      .union([
        z.lazy(() => EnumDifficultyWithAggregatesFilterObjectSchema),
        z.lazy(() => DifficultySchema),
      ])
      .optional(),
    question: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    correctAnswer: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    incorrectAnswers: z
      .lazy(() => StringNullableListFilterObjectSchema)
      .optional(),
  })
  .strict();

export const QuestionScalarWhereWithAggregatesInputObjectSchema = Schema;
