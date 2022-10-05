import { z } from 'zod';
import { ScoreCreateWithoutUserInputObjectSchema } from './ScoreCreateWithoutUserInput.schema';
import { ScoreUncheckedCreateWithoutUserInputObjectSchema } from './ScoreUncheckedCreateWithoutUserInput.schema';
import { ScoreCreateOrConnectWithoutUserInputObjectSchema } from './ScoreCreateOrConnectWithoutUserInput.schema';
import { ScoreCreateManyUserInputEnvelopeObjectSchema } from './ScoreCreateManyUserInputEnvelope.schema';
import { ScoreWhereUniqueInputObjectSchema } from './ScoreWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ScoreUncheckedCreateNestedManyWithoutUserInput> =
  z.union([
    z
      .object({
        create: z
          .union([
            z.lazy(() => ScoreCreateWithoutUserInputObjectSchema),
            z.lazy(() => ScoreCreateWithoutUserInputObjectSchema).array(),
            z.lazy(() => ScoreUncheckedCreateWithoutUserInputObjectSchema),
            z
              .lazy(() => ScoreUncheckedCreateWithoutUserInputObjectSchema)
              .array(),
          ])
          .optional(),
      })
      .strict(),
    z
      .object({
        connectOrCreate: z
          .union([
            z.lazy(() => ScoreCreateOrConnectWithoutUserInputObjectSchema),
            z
              .lazy(() => ScoreCreateOrConnectWithoutUserInputObjectSchema)
              .array(),
          ])
          .optional(),
      })
      .strict(),
    z
      .object({
        createMany: z
          .lazy(() => ScoreCreateManyUserInputEnvelopeObjectSchema)
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
  ]);

export const ScoreUncheckedCreateNestedManyWithoutUserInputObjectSchema =
  Schema;
