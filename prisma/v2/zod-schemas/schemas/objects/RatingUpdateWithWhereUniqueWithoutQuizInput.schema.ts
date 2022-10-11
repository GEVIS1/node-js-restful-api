import { z } from 'zod';
import { RatingWhereUniqueInputObjectSchema } from './RatingWhereUniqueInput.schema';
import { RatingUpdateWithoutQuizInputObjectSchema } from './RatingUpdateWithoutQuizInput.schema';
import { RatingUncheckedUpdateWithoutQuizInputObjectSchema } from './RatingUncheckedUpdateWithoutQuizInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RatingUpdateWithWhereUniqueWithoutQuizInput> = z
  .object({
    where: z.lazy(() => RatingWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => RatingUpdateWithoutQuizInputObjectSchema),
      z.lazy(() => RatingUncheckedUpdateWithoutQuizInputObjectSchema),
    ]),
  })
  .strict();

export const RatingUpdateWithWhereUniqueWithoutQuizInputObjectSchema = Schema;
