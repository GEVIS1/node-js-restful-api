import { z } from 'zod';
import { UserCreateNestedOneWithoutRatingInputObjectSchema } from './UserCreateNestedOneWithoutRatingInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RatingCreateWithoutQuizInput> = z
  .object({
    user: z.lazy(() => UserCreateNestedOneWithoutRatingInputObjectSchema),
    rating: z.number(),
  })
  .strict();

export const RatingCreateWithoutQuizInputObjectSchema = Schema;
