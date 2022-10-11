import { z } from 'zod';
import { RatingCreateManyQuizInputObjectSchema } from './RatingCreateManyQuizInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RatingCreateManyQuizInputEnvelope> = z
  .object({
    data: z.lazy(() => RatingCreateManyQuizInputObjectSchema).array(),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const RatingCreateManyQuizInputEnvelopeObjectSchema = Schema;
