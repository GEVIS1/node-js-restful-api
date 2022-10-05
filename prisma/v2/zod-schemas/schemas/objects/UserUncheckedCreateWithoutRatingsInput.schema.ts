import { z } from 'zod';
import { RoleSchema } from '../enums/Role.schema';
import { ScoreUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './ScoreUncheckedCreateNestedManyWithoutUserInput.schema';
import { QuizUncheckedCreateNestedManyWithoutWinnerInputObjectSchema } from './QuizUncheckedCreateNestedManyWithoutWinnerInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUncheckedCreateWithoutRatingsInput> = z
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
    scores: z
      .lazy(() => ScoreUncheckedCreateNestedManyWithoutUserInputObjectSchema)
      .optional(),
    quizzes: z
      .lazy(() => QuizUncheckedCreateNestedManyWithoutWinnerInputObjectSchema)
      .optional(),
  })
  .strict();

export const UserUncheckedCreateWithoutRatingsInputObjectSchema = Schema;
