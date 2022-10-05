import { z } from 'zod';
import { RatingWhereUniqueInputObjectSchema } from './RatingWhereUniqueInput.schema';
import { RatingUpdateWithoutUserInputObjectSchema } from './RatingUpdateWithoutUserInput.schema';
import { RatingUncheckedUpdateWithoutUserInputObjectSchema } from './RatingUncheckedUpdateWithoutUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RatingUpdateWithWhereUniqueWithoutUserInput> = z
  .object({
    where: z.lazy(() => RatingWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => RatingUpdateWithoutUserInputObjectSchema),
      z.lazy(() => RatingUncheckedUpdateWithoutUserInputObjectSchema),
    ]),
  })
  .strict();

export const RatingUpdateWithWhereUniqueWithoutUserInputObjectSchema = Schema;
