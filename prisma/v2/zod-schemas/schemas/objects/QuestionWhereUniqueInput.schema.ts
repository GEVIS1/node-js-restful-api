import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuestionWhereUniqueInput> = z
  .object({
    id: z.number().optional(),
    question: z.string().optional(),
  })
  .strict();

export const QuestionWhereUniqueInputObjectSchema = Schema;
