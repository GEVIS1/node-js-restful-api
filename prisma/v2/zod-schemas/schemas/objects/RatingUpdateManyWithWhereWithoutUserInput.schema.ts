import { z } from 'zod';
import { RatingScalarWhereInputObjectSchema } from './RatingScalarWhereInput.schema';
import { RatingUpdateManyMutationInputObjectSchema } from './RatingUpdateManyMutationInput.schema';
import { RatingUncheckedUpdateManyWithoutRatingsInputObjectSchema } from './RatingUncheckedUpdateManyWithoutRatingsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RatingUpdateManyWithWhereWithoutUserInput> = z
  .object({
    where: z.lazy(() => RatingScalarWhereInputObjectSchema),
    data: z.union([
      z.lazy(() => RatingUpdateManyMutationInputObjectSchema),
      z.lazy(() => RatingUncheckedUpdateManyWithoutRatingsInputObjectSchema),
    ]),
  })
  .strict();

export const RatingUpdateManyWithWhereWithoutUserInputObjectSchema = Schema;
