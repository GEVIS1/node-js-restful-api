import { z } from 'zod';
import { ScoreScalarWhereInputObjectSchema } from './ScoreScalarWhereInput.schema';
import { ScoreUpdateManyMutationInputObjectSchema } from './ScoreUpdateManyMutationInput.schema';
import { ScoreUncheckedUpdateManyWithoutScoreInputObjectSchema } from './ScoreUncheckedUpdateManyWithoutScoreInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ScoreUpdateManyWithWhereWithoutQuizInput> = z
  .object({
    where: z.lazy(() => ScoreScalarWhereInputObjectSchema),
    data: z.union([
      z.lazy(() => ScoreUpdateManyMutationInputObjectSchema),
      z.lazy(() => ScoreUncheckedUpdateManyWithoutScoreInputObjectSchema),
    ]),
  })
  .strict();

export const ScoreUpdateManyWithWhereWithoutQuizInputObjectSchema = Schema;
