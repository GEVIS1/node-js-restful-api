import { z } from 'zod';
import { RoleSchema } from '../enums/Role.schema';
import { QuizCreateNestedManyWithoutWinnerInputObjectSchema } from './QuizCreateNestedManyWithoutWinnerInput.schema';
import { ScoreCreateNestedManyWithoutUserInputObjectSchema } from './ScoreCreateNestedManyWithoutUserInput.schema';
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
    quiz: z
      .lazy(() => QuizCreateNestedManyWithoutWinnerInputObjectSchema)
      .optional(),
    score: z
      .lazy(() => ScoreCreateNestedManyWithoutUserInputObjectSchema)
      .optional(),
    rating: z
      .lazy(() => RatingCreateNestedManyWithoutUserInputObjectSchema)
      .optional(),
  })
  .strict();

export const UserCreateInputObjectSchema = Schema;
