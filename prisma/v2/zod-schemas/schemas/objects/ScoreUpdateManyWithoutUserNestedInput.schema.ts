import { z } from 'zod';
import { ScoreCreateWithoutUserInputObjectSchema } from './ScoreCreateWithoutUserInput.schema';
import { ScoreUncheckedCreateWithoutUserInputObjectSchema } from './ScoreUncheckedCreateWithoutUserInput.schema';
import { ScoreCreateOrConnectWithoutUserInputObjectSchema } from './ScoreCreateOrConnectWithoutUserInput.schema';
import { ScoreUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './ScoreUpsertWithWhereUniqueWithoutUserInput.schema';
import { ScoreCreateManyUserInputEnvelopeObjectSchema } from './ScoreCreateManyUserInputEnvelope.schema';
import { ScoreWhereUniqueInputObjectSchema } from './ScoreWhereUniqueInput.schema';
import { ScoreUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './ScoreUpdateWithWhereUniqueWithoutUserInput.schema';
import { ScoreUpdateManyWithWhereWithoutUserInputObjectSchema } from './ScoreUpdateManyWithWhereWithoutUserInput.schema';
import { ScoreScalarWhereInputObjectSchema } from './ScoreScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ScoreUpdateManyWithoutUserNestedInput> = z.union(
  [
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
        upsert: z
          .union([
            z.lazy(
              () => ScoreUpsertWithWhereUniqueWithoutUserInputObjectSchema
            ),
            z
              .lazy(
                () => ScoreUpsertWithWhereUniqueWithoutUserInputObjectSchema
              )
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
        set: z
          .union([
            z.lazy(() => ScoreWhereUniqueInputObjectSchema),
            z.lazy(() => ScoreWhereUniqueInputObjectSchema).array(),
          ])
          .optional(),
      })
      .strict(),
    z
      .object({
        disconnect: z
          .union([
            z.lazy(() => ScoreWhereUniqueInputObjectSchema),
            z.lazy(() => ScoreWhereUniqueInputObjectSchema).array(),
          ])
          .optional(),
      })
      .strict(),
    z
      .object({
        delete: z
          .union([
            z.lazy(() => ScoreWhereUniqueInputObjectSchema),
            z.lazy(() => ScoreWhereUniqueInputObjectSchema).array(),
          ])
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
    z
      .object({
        update: z
          .union([
            z.lazy(
              () => ScoreUpdateWithWhereUniqueWithoutUserInputObjectSchema
            ),
            z
              .lazy(
                () => ScoreUpdateWithWhereUniqueWithoutUserInputObjectSchema
              )
              .array(),
          ])
          .optional(),
      })
      .strict(),
    z
      .object({
        updateMany: z
          .union([
            z.lazy(() => ScoreUpdateManyWithWhereWithoutUserInputObjectSchema),
            z
              .lazy(() => ScoreUpdateManyWithWhereWithoutUserInputObjectSchema)
              .array(),
          ])
          .optional(),
      })
      .strict(),
    z
      .object({
        deleteMany: z
          .union([
            z.lazy(() => ScoreScalarWhereInputObjectSchema),
            z.lazy(() => ScoreScalarWhereInputObjectSchema).array(),
          ])
          .optional(),
      })
      .strict(),
  ]
);

export const ScoreUpdateManyWithoutUserNestedInputObjectSchema = Schema;
