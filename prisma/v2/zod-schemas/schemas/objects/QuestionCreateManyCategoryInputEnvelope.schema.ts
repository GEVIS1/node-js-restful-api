import { z } from 'zod';
import { QuestionCreateManyCategoryInputObjectSchema } from './QuestionCreateManyCategoryInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuestionCreateManyCategoryInputEnvelope> = z
  .object({
    data: z.lazy(() => QuestionCreateManyCategoryInputObjectSchema).array(),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const QuestionCreateManyCategoryInputEnvelopeObjectSchema = Schema;
