import { z } from 'zod';
import { QuizCreateWithoutWinnerInputObjectSchema } from './QuizCreateWithoutWinnerInput.schema';
import { QuizUncheckedCreateWithoutWinnerInputObjectSchema } from './QuizUncheckedCreateWithoutWinnerInput.schema';
import { QuizCreateOrConnectWithoutWinnerInputObjectSchema } from './QuizCreateOrConnectWithoutWinnerInput.schema';
import { QuizUpsertWithWhereUniqueWithoutWinnerInputObjectSchema } from './QuizUpsertWithWhereUniqueWithoutWinnerInput.schema';
import { QuizCreateManyWinnerInputEnvelopeObjectSchema } from './QuizCreateManyWinnerInputEnvelope.schema';
import { QuizWhereUniqueInputObjectSchema } from './QuizWhereUniqueInput.schema';
import { QuizUpdateWithWhereUniqueWithoutWinnerInputObjectSchema } from './QuizUpdateWithWhereUniqueWithoutWinnerInput.schema';
import { QuizUpdateManyWithWhereWithoutWinnerInputObjectSchema } from './QuizUpdateManyWithWhereWithoutWinnerInput.schema';
import { QuizScalarWhereInputObjectSchema } from './QuizScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuizUncheckedUpdateManyWithoutWinnerNestedInput> =
  z.union([
    z
      .object({
        create: z
          .union([
            z.lazy(() => QuizCreateWithoutWinnerInputObjectSchema),
            z.lazy(() => QuizCreateWithoutWinnerInputObjectSchema).array(),
            z.lazy(() => QuizUncheckedCreateWithoutWinnerInputObjectSchema),
            z
              .lazy(() => QuizUncheckedCreateWithoutWinnerInputObjectSchema)
              .array(),
          ])
          .optional(),
      })
      .strict(),
    z
      .object({
        connectOrCreate: z
          .union([
            z.lazy(() => QuizCreateOrConnectWithoutWinnerInputObjectSchema),
            z
              .lazy(() => QuizCreateOrConnectWithoutWinnerInputObjectSchema)
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
              () => QuizUpsertWithWhereUniqueWithoutWinnerInputObjectSchema
            ),
            z
              .lazy(
                () => QuizUpsertWithWhereUniqueWithoutWinnerInputObjectSchema
              )
              .array(),
          ])
          .optional(),
      })
      .strict(),
    z
      .object({
        createMany: z
          .lazy(() => QuizCreateManyWinnerInputEnvelopeObjectSchema)
          .optional(),
      })
      .strict(),
    z
      .object({
        set: z
          .union([
            z.lazy(() => QuizWhereUniqueInputObjectSchema),
            z.lazy(() => QuizWhereUniqueInputObjectSchema).array(),
          ])
          .optional(),
      })
      .strict(),
    z
      .object({
        disconnect: z
          .union([
            z.lazy(() => QuizWhereUniqueInputObjectSchema),
            z.lazy(() => QuizWhereUniqueInputObjectSchema).array(),
          ])
          .optional(),
      })
      .strict(),
    z
      .object({
        delete: z
          .union([
            z.lazy(() => QuizWhereUniqueInputObjectSchema),
            z.lazy(() => QuizWhereUniqueInputObjectSchema).array(),
          ])
          .optional(),
      })
      .strict(),
    z
      .object({
        connect: z
          .union([
            z.lazy(() => QuizWhereUniqueInputObjectSchema),
            z.lazy(() => QuizWhereUniqueInputObjectSchema).array(),
          ])
          .optional(),
      })
      .strict(),
    z
      .object({
        update: z
          .union([
            z.lazy(
              () => QuizUpdateWithWhereUniqueWithoutWinnerInputObjectSchema
            ),
            z
              .lazy(
                () => QuizUpdateWithWhereUniqueWithoutWinnerInputObjectSchema
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
            z.lazy(() => QuizUpdateManyWithWhereWithoutWinnerInputObjectSchema),
            z
              .lazy(() => QuizUpdateManyWithWhereWithoutWinnerInputObjectSchema)
              .array(),
          ])
          .optional(),
      })
      .strict(),
    z
      .object({
        deleteMany: z
          .union([
            z.lazy(() => QuizScalarWhereInputObjectSchema),
            z.lazy(() => QuizScalarWhereInputObjectSchema).array(),
          ])
          .optional(),
      })
      .strict(),
  ]);

export const QuizUncheckedUpdateManyWithoutWinnerNestedInputObjectSchema =
  Schema;
