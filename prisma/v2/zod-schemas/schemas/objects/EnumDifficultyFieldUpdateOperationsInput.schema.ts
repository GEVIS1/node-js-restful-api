import { z } from 'zod';
import { DifficultySchema } from '../enums/Difficulty.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumDifficultyFieldUpdateOperationsInput> = z
  .object({
    set: z.lazy(() => DifficultySchema).optional(),
  })
  .strict();

export const EnumDifficultyFieldUpdateOperationsInputObjectSchema = Schema;
