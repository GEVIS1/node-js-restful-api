import { z } from 'zod';
import { UserCreateNestedOneWithoutRatingsInputObjectSchema } from './UserCreateNestedOneWithoutRatingsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RatingCreateInput> = z
  .object({
    user: z.lazy(() => UserCreateNestedOneWithoutRatingsInputObjectSchema),
    rating: z.number(),
  })
  .strict();

export const RatingCreateInputObjectSchema = Schema;
