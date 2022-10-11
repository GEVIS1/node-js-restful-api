import { z } from 'zod';
import { ScoreWhereUniqueInputObjectSchema } from './ScoreWhereUniqueInput.schema';
import { ScoreUpdateWithoutQuizInputObjectSchema } from './ScoreUpdateWithoutQuizInput.schema';
import { ScoreUncheckedUpdateWithoutQuizInputObjectSchema } from './ScoreUncheckedUpdateWithoutQuizInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ScoreUpdateWithWhereUniqueWithoutQuizInput> = z
  .object({
    where: z.lazy(() => ScoreWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => ScoreUpdateWithoutQuizInputObjectSchema),
      z.lazy(() => ScoreUncheckedUpdateWithoutQuizInputObjectSchema),
    ]),
  })
  .strict();

export const ScoreUpdateWithWhereUniqueWithoutQuizInputObjectSchema = Schema;
