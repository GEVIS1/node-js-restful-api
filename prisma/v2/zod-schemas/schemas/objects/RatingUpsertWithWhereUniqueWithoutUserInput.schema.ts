import { z } from 'zod';
import { RatingWhereUniqueInputObjectSchema } from './RatingWhereUniqueInput.schema';
import { RatingUpdateWithoutUserInputObjectSchema } from './RatingUpdateWithoutUserInput.schema';
import { RatingUncheckedUpdateWithoutUserInputObjectSchema } from './RatingUncheckedUpdateWithoutUserInput.schema';
import { RatingCreateWithoutUserInputObjectSchema } from './RatingCreateWithoutUserInput.schema';
import { RatingUncheckedCreateWithoutUserInputObjectSchema } from './RatingUncheckedCreateWithoutUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RatingUpsertWithWhereUniqueWithoutUserInput> = z
  .object({
    where: z.lazy(() => RatingWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => RatingUpdateWithoutUserInputObjectSchema),
      z.lazy(() => RatingUncheckedUpdateWithoutUserInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => RatingCreateWithoutUserInputObjectSchema),
      z.lazy(() => RatingUncheckedCreateWithoutUserInputObjectSchema),
    ]),
  })
  .strict();

export const RatingUpsertWithWhereUniqueWithoutUserInputObjectSchema = Schema;
