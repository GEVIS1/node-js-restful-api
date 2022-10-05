import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { CategoryRelationFilterObjectSchema } from './CategoryRelationFilter.schema';
import { CategoryWhereInputObjectSchema } from './CategoryWhereInput.schema';
import { IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { EnumQuestionTypeFilterObjectSchema } from './EnumQuestionTypeFilter.schema';
import { QuestionTypeSchema } from '../enums/QuestionType.schema';
import { EnumDifficultyFilterObjectSchema } from './EnumDifficultyFilter.schema';
import { DifficultySchema } from '../enums/Difficulty.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema';
import { QuizListRelationFilterObjectSchema } from './QuizListRelationFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuestionWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => QuestionWhereInputObjectSchema),
        z.lazy(() => QuestionWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => QuestionWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => QuestionWhereInputObjectSchema),
        z.lazy(() => QuestionWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
    category: z
      .union([
        z.lazy(() => CategoryRelationFilterObjectSchema),
        z.lazy(() => CategoryWhereInputObjectSchema),
      ])
      .optional()
      .nullable(),
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
    quizzes: z.lazy(() => QuizListRelationFilterObjectSchema).optional(),
  })
  .strict();

export const QuestionWhereInputObjectSchema = Schema;
