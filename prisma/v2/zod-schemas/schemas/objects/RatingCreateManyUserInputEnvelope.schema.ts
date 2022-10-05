import { z } from 'zod';
import { RatingCreateManyUserInputObjectSchema } from './RatingCreateManyUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RatingCreateManyUserInputEnvelope> = z
  .object({
    data: z.lazy(() => RatingCreateManyUserInputObjectSchema).array(),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const RatingCreateManyUserInputEnvelopeObjectSchema = Schema;
