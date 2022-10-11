import { z } from 'zod';
import { ScoreWhereUniqueInputObjectSchema } from './ScoreWhereUniqueInput.schema';
import { ScoreCreateWithoutQuizInputObjectSchema } from './ScoreCreateWithoutQuizInput.schema';
import { ScoreUncheckedCreateWithoutQuizInputObjectSchema } from './ScoreUncheckedCreateWithoutQuizInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ScoreCreateOrConnectWithoutQuizInput> = z
  .object({
    where: z.lazy(() => ScoreWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => ScoreCreateWithoutQuizInputObjectSchema),
      z.lazy(() => ScoreUncheckedCreateWithoutQuizInputObjectSchema),
    ]),
  })
  .strict();

export const ScoreCreateOrConnectWithoutQuizInputObjectSchema = Schema;
