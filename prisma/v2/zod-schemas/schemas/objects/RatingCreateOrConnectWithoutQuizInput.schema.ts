import { z } from 'zod';
import { RatingWhereUniqueInputObjectSchema } from './RatingWhereUniqueInput.schema';
import { RatingCreateWithoutQuizInputObjectSchema } from './RatingCreateWithoutQuizInput.schema';
import { RatingUncheckedCreateWithoutQuizInputObjectSchema } from './RatingUncheckedCreateWithoutQuizInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RatingCreateOrConnectWithoutQuizInput> = z
  .object({
    where: z.lazy(() => RatingWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => RatingCreateWithoutQuizInputObjectSchema),
      z.lazy(() => RatingUncheckedCreateWithoutQuizInputObjectSchema),
    ]),
  })
  .strict();

export const RatingCreateOrConnectWithoutQuizInputObjectSchema = Schema;
