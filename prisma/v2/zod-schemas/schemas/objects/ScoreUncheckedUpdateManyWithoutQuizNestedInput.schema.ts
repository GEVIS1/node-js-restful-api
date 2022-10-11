import { z } from 'zod';
import { ScoreCreateWithoutQuizInputObjectSchema } from './ScoreCreateWithoutQuizInput.schema';
import { ScoreUncheckedCreateWithoutQuizInputObjectSchema } from './ScoreUncheckedCreateWithoutQuizInput.schema';
import { ScoreCreateOrConnectWithoutQuizInputObjectSchema } from './ScoreCreateOrConnectWithoutQuizInput.schema';
import { ScoreUpsertWithWhereUniqueWithoutQuizInputObjectSchema } from './ScoreUpsertWithWhereUniqueWithoutQuizInput.schema';
import { ScoreCreateManyQuizInputEnvelopeObjectSchema } from './ScoreCreateManyQuizInputEnvelope.schema';
import { ScoreWhereUniqueInputObjectSchema } from './ScoreWhereUniqueInput.schema';
import { ScoreUpdateWithWhereUniqueWithoutQuizInputObjectSchema } from './ScoreUpdateWithWhereUniqueWithoutQuizInput.schema';
import { ScoreUpdateManyWithWhereWithoutQuizInputObjectSchema } from './ScoreUpdateManyWithWhereWithoutQuizInput.schema';
import { ScoreScalarWhereInputObjectSchema } from './ScoreScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ScoreUncheckedUpdateManyWithoutQuizNestedInput> =
  z.union([
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
        upsert: z
          .union([
            z.lazy(
              () => ScoreUpsertWithWhereUniqueWithoutQuizInputObjectSchema
            ),
            z
              .lazy(
                () => ScoreUpsertWithWhereUniqueWithoutQuizInputObjectSchema
              )
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
              () => ScoreUpdateWithWhereUniqueWithoutQuizInputObjectSchema
            ),
            z
              .lazy(
                () => ScoreUpdateWithWhereUniqueWithoutQuizInputObjectSchema
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
            z.lazy(() => ScoreUpdateManyWithWhereWithoutQuizInputObjectSchema),
            z
              .lazy(() => ScoreUpdateManyWithWhereWithoutQuizInputObjectSchema)
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
  ]);

export const ScoreUncheckedUpdateManyWithoutQuizNestedInputObjectSchema =
  Schema;
