import { z } from 'zod';
import { ScoreCreateWithoutQuizInputObjectSchema } from './ScoreCreateWithoutQuizInput.schema';
import { ScoreUncheckedCreateWithoutQuizInputObjectSchema } from './ScoreUncheckedCreateWithoutQuizInput.schema';
import { ScoreCreateOrConnectWithoutQuizInputObjectSchema } from './ScoreCreateOrConnectWithoutQuizInput.schema';
import { ScoreCreateManyQuizInputEnvelopeObjectSchema } from './ScoreCreateManyQuizInputEnvelope.schema';
import { ScoreWhereUniqueInputObjectSchema } from './ScoreWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ScoreCreateNestedManyWithoutQuizInput> = z.union(
  [
    z
      .object({
        create: z
          .union([
            z.lazy(() => ScoreCreateWithoutQuizInputObjectSchema),
            z.lazy(() => ScoreCreateWithoutQuizInputObjectSchema).array(),
            z.lazy(() => ScoreUncheckedCreateWithoutQuizInputObjectSchema),
            z
              .lazy(() => ScoreUncheckedCreateWithoutQuizInputObjectSchema)
              .array(),
          ])
          .optional(),
      })
      .strict(),
    z
      .object({
        connectOrCreate: z
          .union([
            z.lazy(() => ScoreCreateOrConnectWithoutQuizInputObjectSchema),
            z
              .lazy(() => ScoreCreateOrConnectWithoutQuizInputObjectSchema)
              .array(),
          ])
          .optional(),
      })
      .strict(),
    z
      .object({
        createMany: z
          .lazy(() => ScoreCreateManyQuizInputEnvelopeObjectSchema)
          .optional(),
      })
      .strict(),
    z
      .object({
        connect: z
          .union([
            z.lazy(() => ScoreWhereUniqueInputObjectSchema),
            z.lazy(() => ScoreWhereUniqueInputObjectSchema).array(),
          ])
          .optional(),
      })
      .strict(),
  ]
);

export const ScoreCreateNestedManyWithoutQuizInputObjectSchema = Schema;
