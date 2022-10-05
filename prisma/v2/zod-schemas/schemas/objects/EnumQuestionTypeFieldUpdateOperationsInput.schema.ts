import { z } from 'zod';
import { QuestionTypeSchema } from '../enums/QuestionType.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumQuestionTypeFieldUpdateOperationsInput> = z
  .object({
    set: z.lazy(() => QuestionTypeSchema).optional(),
  })
  .strict();

export const EnumQuestionTypeFieldUpdateOperationsInputObjectSchema = Schema;
