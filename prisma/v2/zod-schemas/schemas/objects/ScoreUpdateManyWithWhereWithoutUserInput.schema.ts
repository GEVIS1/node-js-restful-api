import { z } from 'zod';
import { ScoreScalarWhereInputObjectSchema } from './ScoreScalarWhereInput.schema';
import { ScoreUpdateManyMutationInputObjectSchema } from './ScoreUpdateManyMutationInput.schema';
import { ScoreUncheckedUpdateManyWithoutScoresInputObjectSchema } from './ScoreUncheckedUpdateManyWithoutScoresInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ScoreUpdateManyWithWhereWithoutUserInput> = z
  .object({
    where: z.lazy(() => ScoreScalarWhereInputObjectSchema),
    data: z.union([
      z.lazy(() => ScoreUpdateManyMutationInputObjectSchema),
      z.lazy(() => ScoreUncheckedUpdateManyWithoutScoresInputObjectSchema),
    ]),
  })
  .strict();

export const ScoreUpdateManyWithWhereWithoutUserInputObjectSchema = Schema;
