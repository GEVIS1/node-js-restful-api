import { z } from 'zod';
import { RatingScalarWhereInputObjectSchema } from './RatingScalarWhereInput.schema';
import { RatingUpdateManyMutationInputObjectSchema } from './RatingUpdateManyMutationInput.schema';
import { RatingUncheckedUpdateManyWithoutRatingInputObjectSchema } from './RatingUncheckedUpdateManyWithoutRatingInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RatingUpdateManyWithWhereWithoutQuizInput> = z
  .object({
    where: z.lazy(() => RatingScalarWhereInputObjectSchema),
    data: z.union([
      z.lazy(() => RatingUpdateManyMutationInputObjectSchema),
      z.lazy(() => RatingUncheckedUpdateManyWithoutRatingInputObjectSchema),
    ]),
  })
  .strict();

export const RatingUpdateManyWithWhereWithoutQuizInputObjectSchema = Schema;
