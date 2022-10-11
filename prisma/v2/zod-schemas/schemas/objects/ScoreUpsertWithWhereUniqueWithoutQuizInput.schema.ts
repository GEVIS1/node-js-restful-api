import { z } from 'zod';
import { ScoreWhereUniqueInputObjectSchema } from './ScoreWhereUniqueInput.schema';
import { ScoreUpdateWithoutQuizInputObjectSchema } from './ScoreUpdateWithoutQuizInput.schema';
import { ScoreUncheckedUpdateWithoutQuizInputObjectSchema } from './ScoreUncheckedUpdateWithoutQuizInput.schema';
import { ScoreCreateWithoutQuizInputObjectSchema } from './ScoreCreateWithoutQuizInput.schema';
import { ScoreUncheckedCreateWithoutQuizInputObjectSchema } from './ScoreUncheckedCreateWithoutQuizInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ScoreUpsertWithWhereUniqueWithoutQuizInput> = z
  .object({
    where: z.lazy(() => ScoreWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => ScoreUpdateWithoutQuizInputObjectSchema),
      z.lazy(() => ScoreUncheckedUpdateWithoutQuizInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => ScoreCreateWithoutQuizInputObjectSchema),
      z.lazy(() => ScoreUncheckedCreateWithoutQuizInputObjectSchema),
    ]),
  })
  .strict();

export const ScoreUpsertWithWhereUniqueWithoutQuizInputObjectSchema = Schema;
