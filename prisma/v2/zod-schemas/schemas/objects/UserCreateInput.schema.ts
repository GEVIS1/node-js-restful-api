import { z } from 'zod';
import { RoleSchema } from '../enums/Role.schema';
import { ScoreCreateNestedManyWithoutUserInputObjectSchema } from './ScoreCreateNestedManyWithoutUserInput.schema';
import { QuizCreateNestedManyWithoutWinnerInputObjectSchema } from './QuizCreateNestedManyWithoutWinnerInput.schema';
import { RatingCreateNestedManyWithoutUserInputObjectSchema } from './RatingCreateNestedManyWithoutUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreateInput> = z
  .object({
    firstname: z.string(),
    lastname: z.string(),
    username: z.string(),
    email: z.string(),
    password: z.string(),
    avatar: z.string(),
    role: z.lazy(() => RoleSchema).optional(),
    createdAt: z.date().optional(),
    scores: z
      .lazy(() => ScoreCreateNestedManyWithoutUserInputObjectSchema)
      .optional(),
    quizzes: z
      .lazy(() => QuizCreateNestedManyWithoutWinnerInputObjectSchema)
      .optional(),
    ratings: z
      .lazy(() => RatingCreateNestedManyWithoutUserInputObjectSchema)
      .optional(),
  })
  .strict();

export const UserCreateInputObjectSchema = Schema;
