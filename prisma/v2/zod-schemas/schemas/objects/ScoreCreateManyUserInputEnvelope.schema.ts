import { z } from 'zod';
import { ScoreCreateManyUserInputObjectSchema } from './ScoreCreateManyUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ScoreCreateManyUserInputEnvelope> = z
  .object({
    data: z.lazy(() => ScoreCreateManyUserInputObjectSchema).array(),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const ScoreCreateManyUserInputEnvelopeObjectSchema = Schema;
