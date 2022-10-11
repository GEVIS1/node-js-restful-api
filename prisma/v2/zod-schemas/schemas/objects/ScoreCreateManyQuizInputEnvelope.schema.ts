import { z } from 'zod';
import { ScoreCreateManyQuizInputObjectSchema } from './ScoreCreateManyQuizInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ScoreCreateManyQuizInputEnvelope> = z
  .object({
    data: z.lazy(() => ScoreCreateManyQuizInputObjectSchema).array(),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const ScoreCreateManyQuizInputEnvelopeObjectSchema = Schema;
