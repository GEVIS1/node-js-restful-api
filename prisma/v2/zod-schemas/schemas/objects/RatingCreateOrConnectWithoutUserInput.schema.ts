import { z } from 'zod';
import { RatingWhereUniqueInputObjectSchema } from './RatingWhereUniqueInput.schema';
import { RatingCreateWithoutUserInputObjectSchema } from './RatingCreateWithoutUserInput.schema';
import { RatingUncheckedCreateWithoutUserInputObjectSchema } from './RatingUncheckedCreateWithoutUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RatingCreateOrConnectWithoutUserInput> = z
  .object({
    where: z.lazy(() => RatingWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => RatingCreateWithoutUserInputObjectSchema),
      z.lazy(() => RatingUncheckedCreateWithoutUserInputObjectSchema),
    ]),
  })
  .strict();

export const RatingCreateOrConnectWithoutUserInputObjectSchema = Schema;
