import { z } from 'zod';
import { RatingWhereUniqueInputObjectSchema } from './RatingWhereUniqueInput.schema';
import { RatingUpdateWithoutQuizInputObjectSchema } from './RatingUpdateWithoutQuizInput.schema';
import { RatingUncheckedUpdateWithoutQuizInputObjectSchema } from './RatingUncheckedUpdateWithoutQuizInput.schema';
import { RatingCreateWithoutQuizInputObjectSchema } from './RatingCreateWithoutQuizInput.schema';
import { RatingUncheckedCreateWithoutQuizInputObjectSchema } from './RatingUncheckedCreateWithoutQuizInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RatingUpsertWithWhereUniqueWithoutQuizInput> = z
  .object({
    where: z.lazy(() => RatingWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => RatingUpdateWithoutQuizInputObjectSchema),
      z.lazy(() => RatingUncheckedUpdateWithoutQuizInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => RatingCreateWithoutQuizInputObjectSchema),
      z.lazy(() => RatingUncheckedCreateWithoutQuizInputObjectSchema),
    ]),
  })
  .strict();

export const RatingUpsertWithWhereUniqueWithoutQuizInputObjectSchema = Schema;
