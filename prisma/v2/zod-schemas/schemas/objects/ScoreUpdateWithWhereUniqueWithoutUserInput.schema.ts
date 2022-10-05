import { z } from 'zod';
import { ScoreWhereUniqueInputObjectSchema } from './ScoreWhereUniqueInput.schema';
import { ScoreUpdateWithoutUserInputObjectSchema } from './ScoreUpdateWithoutUserInput.schema';
import { ScoreUncheckedUpdateWithoutUserInputObjectSchema } from './ScoreUncheckedUpdateWithoutUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ScoreUpdateWithWhereUniqueWithoutUserInput> = z
  .object({
    where: z.lazy(() => ScoreWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => ScoreUpdateWithoutUserInputObjectSchema),
      z.lazy(() => ScoreUncheckedUpdateWithoutUserInputObjectSchema),
    ]),
  })
  .strict();

export const ScoreUpdateWithWhereUniqueWithoutUserInputObjectSchema = Schema;
