import { z } from 'zod';
import { RoleSchema } from '../enums/Role.schema';
import { QuizUncheckedCreateNestedManyWithoutWinnerInputObjectSchema } from './QuizUncheckedCreateNestedManyWithoutWinnerInput.schema';
import { ScoreUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './ScoreUncheckedCreateNestedManyWithoutUserInput.schema';
import { RatingUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './RatingUncheckedCreateNestedManyWithoutUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUncheckedCreateInput> = z
  .object({
    id: z.number().optional(),
    firstname: z.string(),
    lastname: z.string(),
    username: z.string(),
    email: z.string(),
    password: z.string(),
    avatar: z.string(),
    role: z.lazy(() => RoleSchema).optional(),
    createdAt: z.date().optional(),
    quiz: z
      .lazy(() => QuizUncheckedCreateNestedManyWithoutWinnerInputObjectSchema)
      .optional(),
    score: z
      .lazy(() => ScoreUncheckedCreateNestedManyWithoutUserInputObjectSchema)
      .optional(),
    rating: z
      .lazy(() => RatingUncheckedCreateNestedManyWithoutUserInputObjectSchema)
      .optional(),
  })
  .strict();

export const UserUncheckedCreateInputObjectSchema = Schema;
