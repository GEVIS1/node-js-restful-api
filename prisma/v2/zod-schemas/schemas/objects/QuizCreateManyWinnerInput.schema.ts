import { z } from 'zod';
import { DifficultySchema } from '../enums/Difficulty.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuizCreateManyWinnerInput> = z
  .object({
    id: z.number().optional(),
    name: z.string(),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    difficulty: z.lazy(() => DifficultySchema),
    numberOfQuestions: z.number().optional(),
  })
  .strict();

export const QuizCreateManyWinnerInputObjectSchema = Schema;
