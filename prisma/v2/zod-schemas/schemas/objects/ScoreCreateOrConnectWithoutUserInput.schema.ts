import { z } from 'zod';
import { ScoreWhereUniqueInputObjectSchema } from './ScoreWhereUniqueInput.schema';
import { ScoreCreateWithoutUserInputObjectSchema } from './ScoreCreateWithoutUserInput.schema';
import { ScoreUncheckedCreateWithoutUserInputObjectSchema } from './ScoreUncheckedCreateWithoutUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ScoreCreateOrConnectWithoutUserInput> = z
  .object({
    where: z.lazy(() => ScoreWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => ScoreCreateWithoutUserInputObjectSchema),
      z.lazy(() => ScoreUncheckedCreateWithoutUserInputObjectSchema),
    ]),
  })
  .strict();

export const ScoreCreateOrConnectWithoutUserInputObjectSchema = Schema;
