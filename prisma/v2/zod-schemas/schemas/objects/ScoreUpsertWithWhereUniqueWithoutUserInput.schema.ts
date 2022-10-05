import { z } from 'zod';
import { ScoreWhereUniqueInputObjectSchema } from './ScoreWhereUniqueInput.schema';
import { ScoreUpdateWithoutUserInputObjectSchema } from './ScoreUpdateWithoutUserInput.schema';
import { ScoreUncheckedUpdateWithoutUserInputObjectSchema } from './ScoreUncheckedUpdateWithoutUserInput.schema';
import { ScoreCreateWithoutUserInputObjectSchema } from './ScoreCreateWithoutUserInput.schema';
import { ScoreUncheckedCreateWithoutUserInputObjectSchema } from './ScoreUncheckedCreateWithoutUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ScoreUpsertWithWhereUniqueWithoutUserInput> = z
  .object({
    where: z.lazy(() => ScoreWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => ScoreUpdateWithoutUserInputObjectSchema),
      z.lazy(() => ScoreUncheckedUpdateWithoutUserInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => ScoreCreateWithoutUserInputObjectSchema),
      z.lazy(() => ScoreUncheckedCreateWithoutUserInputObjectSchema),
    ]),
  })
  .strict();

export const ScoreUpsertWithWhereUniqueWithoutUserInputObjectSchema = Schema;
