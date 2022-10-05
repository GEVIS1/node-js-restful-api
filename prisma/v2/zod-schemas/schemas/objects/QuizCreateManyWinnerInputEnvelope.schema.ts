import { z } from 'zod';
import { QuizCreateManyWinnerInputObjectSchema } from './QuizCreateManyWinnerInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuizCreateManyWinnerInputEnvelope> = z
  .object({
    data: z.lazy(() => QuizCreateManyWinnerInputObjectSchema).array(),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const QuizCreateManyWinnerInputEnvelopeObjectSchema = Schema;
